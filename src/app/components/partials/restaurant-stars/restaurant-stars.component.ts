import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-restaurant-stars',
  templateUrl: './restaurant-stars.component.html',
  styleUrls: ['./restaurant-stars.component.scss']
})
export class RestaurantStarsComponent implements OnInit {
  @Input() restaurant: any;

  constructor() {
  }

  ngOnInit() {
  }


  createStarsArray(): any[] {
    return Array(Math.round(this.restaurant.rating));
  }

  createLeftStarsArray(): any[] {
    return Array(5 - Math.round(this.restaurant.rating));
  }

}
