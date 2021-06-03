import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ICards } from '../models/card';

export interface CardsResponse {
  data: any[];
  has_more: boolean;
  next_page: string;
}

export interface SetsResponse {
  data: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CardserviceService {
  private cardsUrl = 'https://api.scryfall.com/cards/search?q=set%3A'; // URL to web api
  private setsUrl = 'https://api.scryfall.com/sets';

  constructor(private http: HttpClient) {}

  getCards(set: string): Observable<CardsResponse> {
    const endpoint = this.cardsUrl + set;
    return this.http.get<CardsResponse>(endpoint);
  }

  getSets(): Observable<SetsResponse> {
    const endpoint = this.setsUrl;
    return this.http.get<SetsResponse>(endpoint);
  }

  getMore(url: string): Observable<CardsResponse> {
    const endpoint = url;
    return this.http.get<CardsResponse>(endpoint);
  }

  search(set: string, q: string): Observable<CardsResponse> {
    const endpoint = `https://api.scryfall.com/cards/search?q=set%3A"${set}"+name%3A"${q}"`;
    return this.http
      .get<CardsResponse>(endpoint)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) return throwError('Error 404.');
    else return throwError('Something bad happened; please try again later.');
  }

  formater(response: CardsResponse): ICards {
    return response.data.map((el: any) => {
      return {
        id: el.id,
        name: el.name ? el.name : el.card_faces[0].name,
        uri: el?.uri,
        scryfall_uri: el.scryfall_uri,
        image_uri: el.image_uris?.small
          ? el.image_uris?.small
          : el.card_faces[0]?.image_uris?.small,
        flavor_text: el.flavor_text,
        oracle_text: el.oracle_text,
      };
    });
  }
}
