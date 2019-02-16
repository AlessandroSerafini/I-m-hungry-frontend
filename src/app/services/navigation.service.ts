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
      },
      {
        anchor: 'Login',
        path: '/login',
        icon: 'power_settings_new'
      }
    ];
  }
}
