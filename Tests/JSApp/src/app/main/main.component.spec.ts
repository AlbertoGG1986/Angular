import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ICards } from '../models/card';
import { ISet } from '../models/set';
import {
  CardserviceService,
  SetsResponse,
} from '../services/cardservice.service';
import { MainComponent } from './main.component';

describe('MainComponent', async () => {
  //   let component: MainComponent;
  let SETS: SetsResponse;
  let CARDS: ICards;
  let mockCardsService: any;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    mockCardsService = jasmine.createSpyObj(['getCards', 'getSets', 'getMore']);

    // component = new MainComponent(mockCardsService);

    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [
        {
          provide: CardserviceService,
          useValue: mockCardsService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();

    SETS = {
      data: ['cosas'],
    };

    CARDS = [
      {
        flavor_text: 'undefined',
        id: '8a2ab58d-a632-4162-82b2-664e9ac4b319',
        image_uri:
          'https://c1.scryfall.com/file/scryfall-cards/small/front/8/a/8a2ab58d-a632-4162-82b2-664e9ac4b319.jpg?1622138184',
        name: "Archmage's Charm",
        oracle_text:
          'Choose one - • Counter target spell. • Target player draws two cards. • Gain control of target nonland permanent with mana value 1 or less.',
        scryfall_uri:
          'https://scryfall.com/card/rmh1/7/archmages-charm?utm_source=api',
        uri: 'https://api.scryfall.com/cards/8a2ab58d-a632-4162-82b2-664e9ac4b319',
      },
      {
        flavor_text:
          'Born from the oldest red cedar, nursed on the sap of the tallest spruce, coronated under the mightiest pine.',
        id: 'ad7eac9d-31e3-480e-92fa-58458d6f83b2',
        image_uri:
          'https://c1.scryfall.com/file/scryfall-cards/small/front/a/d/ad7eac9d-31e3-480e-92fa-58458d6f83b2.jpg?1622391811',
        name: 'Ayula, Queen Among Bears',
        oracle_text:
          "Whenever another Bear enters the battlefield under your control, choose one — • Put two +1/+1 counters on target Bear. • Target Bear you control fights target creature you don't control.",
        scryfall_uri:
          'https://scryfall.com/card/rmh1/19/ayula-queen-among-bears?utm_source=api',
        uri: 'https://api.scryfall.com/cards/ad7eac9d-31e3-480e-92fa-58458d6f83b2',
      },
      {
        flavor_text: 'undefined',
        id: '96c5607b-55fe-43c2-93fe-0084d84499d9',
        image_uri:
          'https://c1.scryfall.com/file/scryfall-cards/small/front/9/6/96c5607b-55fe-43c2-93fe-0084d84499d9.jpg?1622391864',
        name: 'Deep Forest Hermit',
        oracle_text:
          'Vanishing 3 (This creature enters the battlefield with three time counters on it. At the beginning of your upkeep, remove a time counter from it. When the last is removed, sacrifice it.) When Deep Forest Hermit enters the battlefield, create four 1/1 green Squirrel creature tokens. Squirrels you control get +1/+1.',
        scryfall_uri:
          'https://scryfall.com/card/rmh1/20/deep-forest-hermit?utm_source=api',
        uri: 'https://api.scryfall.com/cards/96c5607b-55fe-43c2-93fe-0084d84499d9',
      },
    ];
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  describe('getSets', () => {
    it('should set sets from the service', () => {
      mockCardsService.getSets.and.returnValue(of(SETS));
      fixture.detectChanges();

      expect(fixture.componentInstance.sets).toBeTruthy;
    });
  });

  // describe('getCardsNew', () => {
  //   it('should get the cards', () => {});
  // });

  // describe('clear', () => {
  //   it('should clear input', () => {
  //     fixture.componentInstance.searchString = 'search';
  //     fixture.detectChanges();

  //     let DE = fixture.debugElement.query(By.css('#search-box'));
  //     fixture.componentInstance.clear();
  //     fixture.detectChanges();
  //     expect(DE.nativeElement.textContent).toBe('');
  //   });
  // });

  // describe('chooseSet', () => {
  //   it('should change chosen set', () => {
  //     const de = fixture.debugElement.query(By.css('#sets'));
  //     const el = de.nativeElement;

  //     el.value = {
  //       name: 'Ikoria: Lair of Behemoths',
  //       code: 'iko',
  //     };

  //     fixture.componentInstance.selectedSet = {
  //       name: 'Ikoria: Lair of Behemoths',
  //       code: 'iko',
  //     };
  //     fixture.detectChanges();

  //     expect(fixture.componentInstance.selectedSet).toEqual({
  //       name: 'Ikoria: Lair of Behemoths',
  //       code: 'iko',
  //     });
  //   });
  // });
});
