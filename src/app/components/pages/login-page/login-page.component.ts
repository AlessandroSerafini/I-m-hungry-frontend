import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  model: any = {};
  alert = {
    visible: false,
    type: '',
    message: ''
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.alert = {
      message: '',
      type: '',
      visible: false
    };
    this.authService.login(this.model.username, this.model.password).catch((err) => {
      this.alert = {
        message: err.error.message,
        type: 'danger',
        visible: true
      };
    });
  }

}
