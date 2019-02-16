import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListPageComponent} from './components/pages/list-page/list-page.component';
import {AddRestaurantComponent} from './components/pages/add-restaurant/add-restaurant.component';
import {UpdateRestaurantComponent} from './components/pages/update-restaurant/update-restaurant.component';
import {MapPageComponent} from './components/pages/map-page/map-page.component';

const routes: Routes = [
  {
    path: '',
    component: MapPageComponent
  },
  {
    path: 'handle-restaurant',
    component: ListPageComponent
  },
  {
    path: 'add-restaurant',
    component: AddRestaurantComponent
  },
  {
    path: 'update-restaurant/:id',
    component: UpdateRestaurantComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
