import { inject, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CardserviceService } from './cardservice.service';
import { from } from 'rxjs';

describe('CardserviceService', () => {
  let service: CardserviceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardserviceService],
    });
    service = TestBed.inject(CardserviceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCards', () => {
    it('should call with the correct URL', () => {
      service.getCards('eld').subscribe();

      const req = httpTestingController.expectOne(
        'https://api.scryfall.com/cards/search?q=set%3Aeld'
      );
      req.flush({ data: [], has_more: true, next_page: 'more' });
      httpTestingController.verify();
    });
  });

  // describe('getSets', () => {
  //   it('should call sets with the correct URL', (done: DoneFn) => {
  //     service.getSets().subscribe((value) => {
  //       // expect(value).toBeTruthy();
  //       done();
  //     });
  //   });
  // });
});
