import { Component, OnInit } from '@angular/core';
import { DogService, MultipleImagesResponse } from '../services/dogs.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  breeds!: string[];
  dogs!: string[];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // displayedColumns: string[] = ['position', 'name'];
  dataSource = ELEMENT_DATA;

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.listDogs();
  }

  listDogs() {
    this.dogService.listDogs().subscribe(
      (result: MultipleImagesResponse) => {
        if (result) {
          // console.log(result);
          this.breeds = Object.keys(result.message);
          console.log(this.breeds);
          // const data = JSON.parse([result.message]);
          // this.dataSource = data.values;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

export interface Dogs {
  position: number;
  name: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
