import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() restaurant: any = null;
  @Output() deleteRestaurantEmitter = new EventEmitter<any>();

  constructor(public restaurantService: RestaurantService) {
  }

  ngOnInit() {
  }

  deleteRestaurant(restaurantId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.restaurantService.deleteRestaurant(restaurantId)
        .then((res) => {
            this.deleteRestaurantEmitter.emit({success: true});
            resolve(res);
          }
        ).catch((err) => {
        this.deleteRestaurantEmitter.emit({success: false, message: err.error.message});
        reject(err);
      });
    });
  }

}
