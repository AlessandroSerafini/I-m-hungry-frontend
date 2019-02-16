import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subject, Subscription} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, map, mergeMap} from 'rxjs/operators';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
  private restaurants: Array<any> = [];
  private subscription: Subscription;
  public isLoaded = false;
  public filteredRestaurants: Array<any> = [];
  public keyUp = new Subject<KeyboardEvent>();

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.initList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initList() {
    this.restaurants = [];
    this.filteredRestaurants = [];
    this.restaurantService.getRestaurants().then((restaurants) => {
      restaurants.forEach((restaurant) => {
        this.restaurantService.getGooglePlace(restaurant.name, restaurant.city).then((place) => {
          if (typeof place !== 'undefined') {
            this.restaurantService.getGooglePlaceDetails(place.place_id).then((placeDetails) => {
              placeDetails.photoUrl = this.restaurantService.getGooglePlacePhoto(place.photos[0].photo_reference);
              placeDetails.food = restaurant.food;
              placeDetails.id = restaurant.id;
              this.restaurants.push(placeDetails);
              this.filterRestaurants('');
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
  }

  public onDeleteRestaurant() {
    this.initList();
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
      this.filterRestaurants(name);
    });
  }

  public getNbLabel(): string {
    if (this.filteredRestaurants.length === 0) {
      return 'Non sono stati trovati ristoranti';
    } else if (this.filteredRestaurants.length === 1) {
      return 'E\' stato trovato 1 ristorante';
    } else {
      return 'Sono stati trovati ' + this.filteredRestaurants.length + ' ristoranti';
    }
  }

  private filterRestaurants(name: string = '') {
    this.filteredRestaurants = [];
    this.restaurants.forEach((restaurant) => {
      if (name === '' || restaurant.name.toLowerCase().includes(name.toLowerCase())) {
        this.filteredRestaurants.push(restaurant);
      }
    });
  }

}
