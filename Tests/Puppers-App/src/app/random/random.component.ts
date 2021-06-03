import { Component, OnInit } from '@angular/core';
import { DogService } from '../services/dogs.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
})
export class RandomComponent implements OnInit {
  dogUrl: string = '';

  constructor(private dogService: DogService) {}

  findRandom() {
    this.dogService.findRandom().subscribe(
      (result) => {
        console.log(result);
        this.dogUrl = result.message;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}
}
