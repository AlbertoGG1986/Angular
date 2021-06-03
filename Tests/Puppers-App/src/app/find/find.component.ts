import { Component, OnInit } from '@angular/core';
import { DogService } from '../services/dogs.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
})
export class FindComponent implements OnInit {
  breed!: string;
  subbreed!: string;
  failedtofetch!: boolean;
  dogUrl: string = '';

  constructor(private dogService: DogService) {}

  findDog() {
    this.dogService.findDog(this.breed).subscribe(
      (result) => {
        if (result.message) {
          console.log(result);
          this.dogUrl = result.message;
          this.failedtofetch = false;
        }
      },
      (err) => {
        console.log(err);
        this.failedtofetch = true;
      }
    );
  }

  clear() {
    this.dogUrl = '';
    this.breed = '';
    this.failedtofetch = false;
  }

  ngOnInit(): void {}
}
