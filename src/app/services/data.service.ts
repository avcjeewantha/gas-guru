import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  getLocationsAll() {
    return this.http.get(`${environment.apiUrl}/gasGuru/allFualStation`, {headers: new HttpHeaders()
        .set('Authorization', 'Bearer '.concat(localStorage.getItem('token')))
        .set( 'Access-Control-Request-Origin', '*')
    }).pipe(map(response => {
      return response;
    }));
  }

  setlocation(sId: number, vCount: number) {
    const data = { stationId: sId, vehicleCount: vCount };
    return this.http.put(`${environment.apiUrl}/gasGuru/editFualStation`, data, {headers: new HttpHeaders()
        .set('Authorization', 'Bearer '.concat(localStorage.getItem('token')))
        .set( 'Access-Control-Request-Origin', '*')}).pipe(map(response => {
      return response;
    }));
  }

  register(details: JSON) {
    return this.http.post(`${environment.apiUrl}/gasGuru/register`, details, {headers: new HttpHeaders()
        .set( 'Access-Control-Request-Origin', '*')}).pipe(map(response => {
      return response;
    }, error => {

    }));
  }

  getMydetails(username) {
    let body = new HttpParams();
    body = body.set('username', username);
    return this.http.post(`${environment.apiUrl}/gasGuru/getDetailsByUsername`, body, {headers: new HttpHeaders()
        .set('Authorization', 'Bearer '.concat(localStorage.getItem('token')))
        .set( 'Access-Control-Request-Origin', '*')}).pipe(map(response => {
      return response;
    }));
  }

  getNameList() {
    return this.http.get(`${environment.apiUrl}/gasGuru/getUsername`, {headers: new HttpHeaders()
        .set('Authorization', 'Bearer '.concat(localStorage.getItem('token')))
        .set( 'Access-Control-Request-Origin', '*')}).pipe(map(response => {
      return response;
    }));
  }

  sendFeedback(feedBack: string, username: string) {
    const data = {username, feedBack};
    return this.http.post(`${environment.apiUrl}/gasGuru/addFeedback`, data , {headers: new HttpHeaders()
        .set('Authorization', 'Bearer '.concat(localStorage.getItem('token')))
        .set( 'Access-Control-Request-Origin', '*')})
      .pipe(map(response => {
          return response;
        }, error => {
          return error;
        }
      ));
  }

  getFeedbackList() {
    return this.http.get(`${environment.apiUrl}/gasGuru/getFeedback`, {headers: new HttpHeaders()
        .set('Authorization', 'Bearer '.concat(localStorage.getItem('token')))
        .set( 'Access-Control-Request-Origin', '*')}).pipe(map(response => {
      return response;
    }));
  }

}
