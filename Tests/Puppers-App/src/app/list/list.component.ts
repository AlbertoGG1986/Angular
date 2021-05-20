import { Component, OnInit } from '@angular/core';
import { DogService, MultipleImagesResponse } from '../services/dogs.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  dogUrl!: string;
  breeds!: string[];
  subbreeds!: string[];
  selectedbreed = '';
  selectedsubbreed = '';
  selectedbreedhassubs = false;

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.listDogs();
  }

  listDogs() {
    this.dogService.listDogs().subscribe(
      (result: MultipleImagesResponse) => {
        if (result) {
          // console.log(result);
          this.breeds = result.message;
          // console.log(this.breeds);
          // const data = JSON.parse([result.message]);
          // this.dataSource = data.values;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  listSubbreeds() {
    // console.log(this.selectedbreed);
    this.selectedbreedhassubs = false;
    this.dogService.listSubbreeds(this.selectedbreed).subscribe(
      (result: MultipleImagesResponse) => {
        if (result) {
          if (result.message.length > 0) this.selectedbreedhassubs = true;
          // console.log(result);
          this.subbreeds = result.message;

          // const data = JSON.parse([result.message]);
          // this.dataSource = data.values;
        }
        console.log(this.subbreeds);
        console.log(this.selectedbreedhassubs.toString());
      },
      (err) => {
        console.log(err);
      }
    );
  }

  findDog() {
    this.dogService
      .findDog(this.selectedbreed, this.selectedsubbreed)
      .subscribe(
        (result) => {
          if (result.message) {
            console.log(result);
            this.dogUrl = result.message;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  showsub() {
    console.log(this.selectedsubbreed);
  }

  clear() {
    this.selectedbreed = '';
    this.selectedsubbreed = '';
  }
}
