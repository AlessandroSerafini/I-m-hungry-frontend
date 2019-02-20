import {Injectable} from '@angular/core';
import {WebService} from './web.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebService,
              private router: Router) {
  }

  public login(username: string = '', password: string = ''): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        username: username,
        password: password
      };
      this.webService.getJSON('/login', params).then((res) => {
        console.log(res);
        localStorage.setItem('authToken', res.message);
        this.router.navigate(['/handle-restaurant']);
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webService.getJSON('/logout').then((res) => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public getAuthToken(): string {
    return localStorage.getItem('authToken');
  }
}
