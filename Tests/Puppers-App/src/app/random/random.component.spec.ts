// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { RandomComponent } from './random.component';

describe('RandomComponent', () => {
  let component: RandomComponent;
  let response = {
    message: `https:/images.dog.ceo/breeds/akita/Akita_hiking_in_Shpella_e_Pellumbasit.jpg`,
  };
  let dogService = jasmine.createSpyObj([
    'findRandom',
    'findDog',
    'listDogs',
    'listSubBreeds',
  ]);

  beforeEach(() => {
    component = new RandomComponent(dogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('findRandom', () => {
    it('should get a random dog', () => {
      expect(component.dogUrl).toBe('');

      dogService.findRandom.and.returnValue(of(response));
      component.findRandom();

      expect(component.dogUrl).toEqual(response.message);
    });
  });
});
