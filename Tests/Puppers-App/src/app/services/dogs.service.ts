import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface SingleImageResponse {
  message: string;
  status: string;
}

export interface MultipleImagesResponse {
  message: string[];
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class DogService {
  constructor(private http: HttpClient) {}

  findRandom(): Observable<SingleImageResponse> {
    const endpoint = `https://dog.ceo/api/breeds/image/random`;
    return this.http.get<SingleImageResponse>(endpoint);
  }

  findDog(breed: string, subBreed?: string): Observable<SingleImageResponse> {
    const endpoint = subBreed
      ? `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`
      : `https://dog.ceo/api/breed/${breed}/images/random`;

    return this.http.get<SingleImageResponse>(endpoint);
  }

  listDogs(): Observable<MultipleImagesResponse> {
    const endpoint = `https://dog.ceo/api/breeds/list/all`;
    return this.http.get<MultipleImagesResponse>(endpoint);
  }

  listSubbreeds(breed: string): Observable<MultipleImagesResponse> {
    const endpoint = `https://dog.ceo/api/breed/${breed}/list`;
    return this.http.get<MultipleImagesResponse>(endpoint);
  }

  // findMany(breed: string, subBreed: string, count: number): Observable<BreedImagesResponse> {
  //   const endpoint = subBreed ?
  //     `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/${count}`:
  //     `https://dog.ceo/api/breed/${breed}/images/random/${count}`;

  //   return this.http.get<BreedImagesResponse>(endpoint);
  // }
}
