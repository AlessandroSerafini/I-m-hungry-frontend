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
      this.webService.getJSON('/login?username=' + username + '&password=' + password).then((res) => {
        localStorage.setItem('isAuthenticated', 'true');
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
        localStorage.removeItem('isAuthenticated');
        this.router.navigate(['/login']);
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public isLogged(): boolean {
    return localStorage.getItem('isAuthenticated') !== null;
  }
}
