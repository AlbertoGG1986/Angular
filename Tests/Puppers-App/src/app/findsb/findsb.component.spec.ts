import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindsbComponent } from './findsb.component';

describe('FindsbComponent', () => {
  let component: FindsbComponent;
  let fixture: ComponentFixture<FindsbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindsbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindsbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
