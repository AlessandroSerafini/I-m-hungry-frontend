import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() {


  }

  getNavigation(): Array<any> {
    return [
      {
        anchor: 'Map',
        path: '',
        icon: 'place'
      },
      {
        anchor: 'List',
        path: '/handle-restaurant',
        icon: 'restaurant'
      }
    ];
  }
}
