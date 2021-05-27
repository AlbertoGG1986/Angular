import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DogService } from './dogs.service';

describe('DogsService', () => {
  let service: DogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [],
    });
    service = TestBed.inject(DogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
