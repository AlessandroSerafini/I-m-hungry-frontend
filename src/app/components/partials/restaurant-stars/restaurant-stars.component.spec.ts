import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantStarsComponent } from './restaurant-stars.component';

describe('RestaurantStarsComponent', () => {
  let component: RestaurantStarsComponent;
  let fixture: ComponentFixture<RestaurantStarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantStarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
