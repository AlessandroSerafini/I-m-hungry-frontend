import {Component, OnInit} from '@angular/core';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  private restaurants: Array<any> = [];
  public isLoaded = false;
  public filteredRestaurants: Array<any> = [];

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.initList();
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

  private filterRestaurants(name: string = '') {
    this.filteredRestaurants = [];
    this.restaurants.forEach((restaurant) => {
      if (name === '' || restaurant.name.toLowerCase().includes(name.toLowerCase())) {
        this.filteredRestaurants.push(restaurant);
      }
    });
  }

}
