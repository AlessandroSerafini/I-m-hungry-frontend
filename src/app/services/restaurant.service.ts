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

  public addRestaurant(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webService.putRequest('/addRestaurant', body).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  updateRestaurant(restaurantId, body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webService.postRequest('/updateRestaurant/' + restaurantId, body).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public getRestaurantDetail(restaurantId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webService.getJSON('/restaurants/' + restaurantId).then((restaurant) => {
        resolve(restaurant);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public deleteRestaurant(restaurantId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webService.deleteRequest('/deleteRestaurant/' + restaurantId).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public getFoods(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webService.getJSON('/foods').then((foods) => {
        resolve(foods);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
