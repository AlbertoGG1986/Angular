import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  selectedSet!: string;
  sets!: Set[];

  constructor() { }

  ngOnInit(): void {
    this.sets = SETS;
  }

  chooseSet() {
    
  }

}

export interface Set {
  name: string;
  code: string;
}

var SETS: Set[] = [{
  name: 'Throne of Eldraine',
  code: 'eld'
}, {
  name: 'Theros Beyond Death',
  code: 'thb'
},{
  name: 'Ikoria: Lair of Behemoths',
  code: 'iko'
}, {
  name: 'Core Set 2021',
  code: 'm21'
}, {
  name: 'Zendikar Rising',
  code: 'znr'
}, {
  name: 'Kaldheim',
  code: 'khm'
}, {
  name: 'Strixhaven: School of Mages',
  code: 'stx'
}];
