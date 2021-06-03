import { TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DogService } from './dogs.service';

describe('DogsService', () => {
  let httpTestingController: HttpTestingController;
  let service: DogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogService],
    });
    service = TestBed.inject(DogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findRandom', () => {
    it('should get a random pupper', () => {
      expect(service.findRandom()).toBeTruthy();
    });
  });

  describe('findDog', () => {
    it('should get dog from breed', (done) => {
      let dogBreed = 'akita';

      service.findDog(dogBreed).subscribe();

      const req = httpTestingController.expectOne(
        `https://dog.ceo/api/breed/${dogBreed}/images/random`
      );
      req.flush({
        message: `https:/images.dog.ceo/breeds/akita/Akita_hiking_in_Shpella_e_Pellumbasit.jpg`,
        status: 'success',
      });
      httpTestingController.verify();
      done();
    });
  });
});

// beforeEach(() => {
//   mockDogsService = jasmine.createSpyObj(['findDog']);

//   TestBed.configureTestingModule({
//     imports: [HttpClientTestingModule],
//     providers: [
//       DogService,
//       { provide: DogService, useValue: mockDogsService },
//     ],
//   });
//   // service = TestBed.inject(DogService);
//   httpTestingController = TestBed.get(httpTestingController);
//   service = TestBed.get(DogService);
// });

// describe('findDog', () => {
//   it('should call findDog', () => {
//     service.findDog('akita').subscribe();

//     const req = httpTestingController.expectOne(
//       'https://dog.ceo/api/breed/akita/images/random'
//     );
//     req.flush(
//       `https:\/\/images.dog.ceo\/breeds\/akita\/Akita_hiking_in_Shpella_e_Pellumbasit.jpg`
//     );
//   });
// });
