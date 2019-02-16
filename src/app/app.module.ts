import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { MapPageComponent } from './components/pages/map-page/map-page.component';
import { AgmCoreModule } from '@agm/core';
import { RestaurantStarsComponent } from './components/partials/restaurant-stars/restaurant-stars.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapPageComponent,
    RestaurantStarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBtIQBtYgekv6YnUfXFGK3La0vm6armidQ'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
