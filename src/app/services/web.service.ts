import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private baseUrl = 'https://i-am-hungry.glitch.me';

  constructor(private http: HttpClient) {
  }


  public getJSON(path: string = '', isAbsolutePath: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = isAbsolutePath ? path : this.baseUrl + path;
      this.http.get(url)
        .toPromise()
        .then((res) => {
            resolve(res);
          }
        ).catch((err) => {
        reject(err);
      });
    });
  }
}
