import {Component, Input, OnInit} from '@angular/core';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss']
})
export class RestaurantFormComponent implements OnInit {
  isLoaded = false;
  model: any = {};
  foods: Array<any>;
  @Input() restaurantId: string = null;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.getFoods().then((foods) => {
      this.foods = foods;
      if (this.restaurantId !== null) {
        this.restaurantService.getRestaurantDetail(this.restaurantId).then((restaurant) => {
          this.model.name = restaurant.name;
          this.model.city = restaurant.city;
          this.model.food = restaurant.food;
          this.isLoaded = true;
        }).catch((err) => {
          this.isLoaded = true;
          console.log(err);
        });
      } else {
        this.isLoaded = true;
      }
    }).catch((err) => {
      console.log(err);
    });
  }

}
