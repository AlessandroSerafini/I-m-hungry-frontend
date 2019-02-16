import {Injectable} from '@angular/core';
import {WebService} from './web.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor() {
  }

  public getReview(restaurant): string {
    let review = '';
    if (typeof restaurant.reviews !== 'undefined' && restaurant.reviews.length > 0) {
      review = restaurant.reviews[0].text + ' - ' + restaurant.reviews[0].text;
    }
    return review;
  }
}
