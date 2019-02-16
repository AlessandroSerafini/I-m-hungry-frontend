import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
  private restaurants: Array<any> = [];
  public filteredRestaurants: Array<any> = [];
  public foods: Array<string> = [];

  constructor(public restaurantService: RestaurantService) { }

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

}
