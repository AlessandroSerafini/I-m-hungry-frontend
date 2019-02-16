import {Injectable} from '@angular/core';
import {WebService} from './web.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private googleApiKey = 'AIzaSyBtIQBtYgekv6YnUfXFGK3La0vm6armidQ';
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

  public getGooglePlace(placeName: string = '', placeCity: string = ''): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/' +
        'json?input=' + encodeURIComponent(placeName) + ' ' + encodeURIComponent(placeCity) + '&inputtype=textquery' +
        '&fields=place_id,photos&key=' + this.googleApiKey;
      this.webService.getJSON(url, true).then((res) => {
        resolve(res.candidates[0]);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public getGooglePlaceDetails(placeId: string = ''): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'https://maps.googleapis.com/maps/api/place/details/json?' +
        'placeid=' + placeId + '&fields=formatted_address,geometry,' +
        'formatted_phone_number,name,rating,reviews&key=' + this.googleApiKey;
      this.webService.getJSON(url, true).then((res) => {
        resolve(res.result);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public getGooglePlacePhoto(reference: string = ''): string {
    return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400' +
      '&photoreference=' + reference + '&key=' + this.googleApiKey;
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
