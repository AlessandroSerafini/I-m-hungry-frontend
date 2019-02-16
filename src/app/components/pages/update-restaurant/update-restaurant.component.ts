import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.scss']
})
export class UpdateRestaurantComponent implements OnInit {
  restaurantId = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.restaurantId = params.params.id;
    });
  }

}
