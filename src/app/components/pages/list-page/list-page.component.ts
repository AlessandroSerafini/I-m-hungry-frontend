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
  alert = {
    visible: false,
    type: '',
    message: ''
  };

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.subscribeToKeyUp();
    this.initList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initList() {
    this.restaurants = [];
    this.filteredRestaurants = [];
    this.restaurantService.getRestaurants().then((restaurants) => {
      this.restaurants = restaurants;
      this.filterRestaurants('');
    }).catch((err) => {
      console.log(err);
    });
  }

  public onDeleteRestaurant(res) {
    this.alert = {
      message: '',
      type: '',
      visible: false
    };

    if (res.success) {
      this.initList();
    } else {
      this.alert = {
        message: res.message,
        type: 'danger',
        visible: true
      };
    }
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
    if (this.restaurants.length > 0) {
      this.restaurants.forEach((restaurant) => {
        if (name === '' || restaurant.name.toLowerCase().includes(name.toLowerCase())) {
          this.filteredRestaurants.push(restaurant);
        }
      });
    }
  }

}
