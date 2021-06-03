// import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FindComponent } from './find.component';
// import { DogService } from '../services/dogs.service';

describe('FindComponent', () => {
  let component: FindComponent;
  let breed = 'akita';
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
    component = new FindComponent(dogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('findDog', () => {
    it('should retrieve dog', () => {
      expect(component.dogUrl).toBe('');

      dogService.findDog.and.returnValue(of(response));
      component.breed = breed;
      component.findDog();

      expect(component.dogUrl).toEqual(response.message);
    });
  });

  describe('clear', () => {
    it('should clear search', () => {
      component.dogUrl = 'akita';
      component.clear();
      expect(component.dogUrl).toEqual('');
    });
  });
});
