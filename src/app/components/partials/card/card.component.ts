import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() restaurant: any = null;
  @Output() deleteRestaurantEmitter = new EventEmitter<string>();

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
  }

  deleteRestaurant(restaurantId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.restaurantService.deleteRestaurant(restaurantId)
        .then((res) => {
            this.deleteRestaurantEmitter.emit();
            resolve(res);
          }
        ).catch((err) => {
        reject(err);
      });
    });
  }

}
