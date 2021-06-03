import { Component, OnInit, Output } from '@angular/core';
import {
  CardserviceService,
  CardsResponse,
} from '../services/cardservice.service';
import { ICard, ICards } from '../models/card';
import { ISet } from '../models/set';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @Input() public dataParent: any;

  cardsFilter: ICards = [];
  cards!: ICards;
  sets: ISet[] = [];
  selectedSet!: ISet;
  selectedName!: string;
  searchString!: string;
  sets$!: Observable<ISet[]>;
  pageSlice!: ICards;
  sortDirection: boolean = false;

  constructor(private cardService: CardserviceService) {}

  ngOnInit(): void {
    // this.sets = SETS;
    // this.selectedSet = SETS[0].code;;
    this.cards = [];
    this.sets = [];
    this.selectedSet = { name: '', code: '' };
    this.pageSlice = [];
    this.searchString = '';
    this.getSets();
    console.log(this.dataParent);
  }

  getCards() {
    console.log(this.selectedSet.code);
    this.cardService.getCards(this.selectedSet.code).subscribe(
      (result: CardsResponse) => {
        this.cards = [];

        console.log(this.cardService.formater(result));
        console.log(result);
        result.data.forEach((el: any) => console.log(el));
        var temp: string[];
        if (result) {
          if (result.has_more) {
            this.cardService.getMore(result.next_page).subscribe(
              (result2: CardsResponse) => {
                temp = result.data.concat(result2.data);
                console.log(temp);
                let parsed = JSON.parse(JSON.stringify(temp));
                for (let index = 0; index < parsed.length; index++) {
                  if (parsed[index].card_faces && !parsed[index].image_uris) {
                    // console.log(parsed[index].card_faces[0].image_uris.small);
                    this.addCard(
                      parsed[index].id,
                      parsed[index].card_faces[0].name,
                      parsed[index].uri,
                      parsed[index].scryfall_uri,
                      parsed[index].card_faces[0].image_uris.small,
                      parsed[index].flavor_text,
                      parsed[index].oracle_text
                    );
                    this.addCard(
                      parsed[index].id,
                      parsed[index].card_faces[1].name,
                      parsed[index].uri,
                      parsed[index].scryfall_uri,
                      parsed[index].card_faces[1].image_uris.small,
                      parsed[index].flavor_text,
                      parsed[index].oracle_text
                    );
                  } else {
                    this.addCard(
                      parsed[index].id,
                      parsed[index].name,
                      parsed[index].uri,
                      parsed[index].scryfall_uri,
                      parsed[index].image_uris.small,
                      parsed[index].flavor_text,
                      parsed[index].oracle_text
                    );
                  }
                }
              },
              (err) => {
                console.log(err);
                this.cards = [];
              }
            );
          } else {
            let parsed = JSON.parse(JSON.stringify(result.data));
            for (let index = 0; index < parsed.length; index++) {
              if (parsed[index].card_faces && !parsed[index].image_uris) {
                this.addCard(
                  parsed[index].id,
                  parsed[index].card_faces[0].name,
                  parsed[index].uri,
                  parsed[index].scryfall_uri,
                  parsed[index].card_faces[0].image_uris.small,
                  parsed[index].flavor_text,
                  parsed[index].oracle_text
                );
                this.addCard(
                  parsed[index].id,
                  parsed[index].card_faces[1].name,
                  parsed[index].uri,
                  parsed[index].scryfall_uri,
                  parsed[index].card_faces[1].image_uris.small,
                  parsed[index].flavor_text,
                  parsed[index].oracle_text
                );
              } else {
                this.addCard(
                  parsed[index].id,
                  parsed[index].name,
                  parsed[index].uri,
                  parsed[index].scryfall_uri,
                  parsed[index].image_uris.small,
                  parsed[index].flavor_text,
                  parsed[index].oracle_text
                );
              }
            }
          }
          this.pageSlice = this.cards.slice(0, 8);
          console.log(this.pageSlice);
        }
      },
      (err) => {
        console.log(err);
        this.cards = [];
      }
    );
  }

  getCardsNew(): void {
    this.cardService
      .getCards(this.selectedSet.code)
      .subscribe((response: CardsResponse) => {
        if (!response) {
          return;
        }
        console.log(response);
        this.cards = this.cardService.formater(response);

        if (response.has_more) {
          this.cardService
            .getMore(response.next_page)
            .subscribe((responseNextPage: CardsResponse) => {
              this.cards.concat(this.cardService.formater(responseNextPage));
            });
        }
        this.updatePaginator(this.cards);
        console.log(this.cards);
      });
  }

  private updatePaginator(cards: ICards): void {
    this.pageSlice = cards.slice(0, 8);
  }

  getSets() {
    this.cardService.getSets().subscribe(
      (result) => {
        let parsed = JSON.parse(JSON.stringify(result.data));
        for (let index = 0; index < parsed.length; index++) {
          this.addSet(parsed[index].name, parsed[index].code);
        }
      },
      (err) => {
        console.log(err);
        this.sets = [];
      }
    );
    console.log(this.sets);
  }

  search(term: string): void {
    // wait 300ms after each keystroke before considering the term
    debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      // switchMap((term: string) => this.cardService.search(this.selectedSet, term));
      this.cardService.search(this.selectedSet.code, term).subscribe(
        (result: CardsResponse) => {
          this.cards = [];
          if (result) {
            let parsed = JSON.parse(JSON.stringify(result.data));
            for (let index = 0; index < parsed.length; index++) {
              if (parsed[index].card_faces && !parsed[index].image_uris) {
                this.addCard(
                  parsed[index].id,
                  parsed[index].card_faces[0].name,
                  parsed[index].uri,
                  parsed[index].scryfall_uri,
                  parsed[index].card_faces[0].image_uris.small,
                  parsed[index].flavor_text,
                  parsed[index].oracle_text
                );
                this.addCard(
                  parsed[index].id,
                  parsed[index].card_faces[1].name,
                  parsed[index].uri,
                  parsed[index].scryfall_uri,
                  parsed[index].card_faces[1].image_uris.small,
                  parsed[index].flavor_text,
                  parsed[index].oracle_text
                );
              } else {
                this.addCard(
                  parsed[index].id,
                  parsed[index].name,
                  parsed[index].uri,
                  parsed[index].scryfall_uri,
                  parsed[index].image_uris.small,
                  parsed[index].flavor_text,
                  parsed[index].oracle_text
                );
              }
            }
          }
          this.pageSlice = this.cards.slice(0, 8);
        },
        (err) => {
          console.log(err);
          this.pageSlice = [];
        }
      );
    console.log(this.cards);
  }

  public searchNew(term: string): void {
    this.cardsFilter = this.cards.filter((card: ICard) => {
      return this.includesInCard(card, term);
    });
    this.updatePaginator(this.cardsFilter);
  }

  private includesInCard(card: ICard, term: string): boolean {
    return Object.values(card).some((el) => el?.includes(term));
  }

  onPageChange($event: { pageIndex: number; pageSize: number }) {
    console.log($event);

    const startIndex = $event.pageIndex * $event.pageSize;
    let endIndex = startIndex + $event.pageSize;
    if (endIndex > this.cards.length) {
      endIndex = this.cards.length;
    }
    this.pageSlice = this.cards.slice(startIndex, endIndex);
    // console.log(this.pageSlice);
  }

  addCard(
    id: string,
    name: string,
    uri: string,
    scryfall_uri: string,
    image_uri: string,
    flavor_text: string,
    oracle_text: string
  ) {
    // let newCard: ICard =
    this.cards.push({
      id: id,
      name: name,
      uri: uri,
      scryfall_uri: scryfall_uri,
      image_uri: image_uri,
      flavor_text: flavor_text,
      oracle_text: oracle_text,
    });
  }

  addSet(name: string, code: string) {
    let newSet: ISet = { name: name, code: code };
    this.sets.push(newSet);
  }

  chooseSet() {
    console.log(this.selectedSet);
    this.selectedName = this.selectedSet.name;
    // this.getCards();
    this.getCardsNew();
    this.searchString = '';
  }

  clear() {
    this.searchString = '';
    // this.getCards();
    this.getCardsNew();
  }

  sortCards(): void {
    const direction = this.sortDirection ? 1 : -1;
    const direction2 = this.sortDirection ? -1 : 1;
    this.sortDirection = !this.sortDirection;
    this.updatePaginator(
      this.cards.sort((a: ICard, b: ICard) =>
        a.name < b.name ? direction2 : direction
      )
    );
  }
}

// var SETS: Set[] = [{
//   name: 'Throne of Eldraine',
//   code: 'eld'
// }, {
//   name: 'Theros Beyond Death',
//   code: 'thb'
// },{
//   name: 'Ikoria: Lair of Behemoths',
//   code: 'iko'
// }, {
//   name: 'Core Set 2021',
//   code: 'm21'
// }, {
//   name: 'Zendikar Rising',
//   code: 'znr'
// }, {
//   name: 'Kaldheim',
//   code: 'khm'
// }, {
//   name: 'Strixhaven: School of Mages',
//   code: 'stx'
// }];
