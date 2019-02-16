import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../services/navigation.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(public navigationService: NavigationService,
              public authService: AuthService) {
  }

  ngOnInit() {
  }

}
