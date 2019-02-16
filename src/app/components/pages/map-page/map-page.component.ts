import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RestaurantService} from '../../../services/restaurant.service';
import {NavigationService} from '../../../services/navigation.service';
import {of, Subject, Subscription} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, map, mergeMap} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapPageComponent implements OnInit {
  private restaurants: Array<any> = [];
  public filteredRestaurants: Array<any> = [];
  public foods: Array<string> = [];
  public isLoading = false;
  public filteredFoods: any = [];
  private subscription: Subscription;
  public keyUp = new Subject<KeyboardEvent>();
  private nameFilterVal = '';

  constructor(public restaurantService: RestaurantService,
              public navigationService: NavigationService,
              public authService: AuthService) { }

  ngOnInit() {
    this.restaurantService.getRestaurants().then((restaurants) => {
      restaurants.forEach((restaurant) => {
        this.restaurantService.getGooglePlace(restaurant.name, restaurant.city).then((place) => {
          if (typeof place !== 'undefined') {
            this.restaurantService.getGooglePlaceDetails(place.place_id).then((placeDetails) => {
              placeDetails.photoUrl = this.restaurantService.getGooglePlacePhoto(place.photos[0].photo_reference);
              placeDetails.food = restaurant.food;
              placeDetails.id = restaurant.id;
              this.restaurants.push(placeDetails);
              this.filteredRestaurants.push(placeDetails);
            }).catch((err) => {
              console.log(err);
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      });
    }).catch((err) => {
      console.log(err);
    });

    this.restaurantService.getFoods().then((foods) => {
      foods.forEach((food) => {
        this.foods.push(food.name);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  private subscribeToKeyUp() {
    this.subscription = this.keyUp.pipe(
      map((event: any) => event.target.value),
      debounceTime(1000),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(
        delay(10),
      )),
    ).subscribe((name) => {
      this.nameFilterVal = name;
      this.filterRestaurants();
    });
  }

  public onFoodFilterAdd(): void {
    this.filterRestaurants();
  }

  public onFoodFilterRemove(): void {
    this.filterRestaurants();
  }

  private filterRestaurants(): void {
    this.isLoading = true;
    this.filteredRestaurants = [];

    this.restaurants.forEach((restaurant) => {
      if ((this.filteredFoods.length === 0 || this.filteredFoods.some(food => food.text === restaurant.food))
        && (this.nameFilterVal === '' || restaurant.name.toLowerCase().includes(this.nameFilterVal.toLowerCase()))) {
        this.filteredRestaurants.push(restaurant);
      }
    });
    this.isLoading = false;
  }

  public refreshFoodFilter(foodFilters: any): void {
    this.filteredFoods = foodFilters;
  }

}
