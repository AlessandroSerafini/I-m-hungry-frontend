import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private baseUrl = 'https://i-am-hungry.glitch.me';

  constructor(private http: HttpClient) {
  }


  public getJSON(path: string = '', parameters: object = null, isAbsolutePath: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = isAbsolutePath ? path : this.baseUrl + path;

      let params = null;

      if (parameters !== null) {
        params = new HttpParams();
        for (const key in parameters) {
          if (parameters.hasOwnProperty(key)) {
            params = params.append(key, parameters[key]);
          }
        }
      }

      this.http.get(url, {params: params})
        .toPromise()
        .then((res) => {
            resolve(res);
          }
        ).catch((err) => {
        reject(err);
      });
    });
  }

  public putRequest(path: string = '', body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUrl + path, body)
        .toPromise()
        .then((res) => {
            resolve(res);
          }
        ).catch((err) => {
        reject(err);
      });
    });
  }

  public postRequest(path: string = '', body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + path, body)
        .toPromise()
        .then((res) => {
            resolve(res);
          }
        ).catch((err) => {
        reject(err);
      });
    });
  }

  public deleteRequest(path: string = ''): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseUrl + path)
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
