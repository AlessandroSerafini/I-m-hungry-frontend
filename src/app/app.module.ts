import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { MapPageComponent } from './components/pages/map-page/map-page.component';
import { AgmCoreModule } from '@agm/core';
import { RestaurantStarsComponent } from './components/partials/restaurant-stars/restaurant-stars.component';
import {SelectModule} from 'ng2-select';
import {HttpClientModule} from '@angular/common/http';
import { ListPageComponent } from './components/pages/list-page/list-page.component';
import { CardComponent } from './components/partials/card/card.component';
import { RestaurantFormComponent } from './components/partials/restaurant-form/restaurant-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapPageComponent,
    RestaurantStarsComponent,
    ListPageComponent,
    CardComponent,
    RestaurantFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBtIQBtYgekv6YnUfXFGK3La0vm6armidQ'
    }),
    SelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
