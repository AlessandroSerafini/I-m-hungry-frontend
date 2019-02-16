import {Injectable} from '@angular/core';
import {WebService} from './web.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private webService: WebService) {
  }

  public getReview(restaurant): string {
    let review = '';
    if (typeof restaurant.reviews !== 'undefined' && restaurant.reviews.length > 0) {
      review = restaurant.reviews[0].text + ' - ' + restaurant.reviews[0].text;
    }
    return review;
  }

  public getRestaurants(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webService.getJSON('/restaurants').then((restaurants) => {
        resolve(restaurants);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
