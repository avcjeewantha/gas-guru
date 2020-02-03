import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {
  }

  getLocationsAll() {
    return this.http.get(`${environment.apiUrl}/admin/getLocationsAll`).pipe(map(response => {
      return response;
    }));
  }

  setlocation(sId: number, vCount: number) {
    const data = { sId, vCount };
    return this.http.post(`${environment.apiUrl}/admin/setlocation`, data).pipe(map(response => {
      return response;
    }));
  }

  register(details: JSON) {
    return this.http.post(`${environment.apiUrl}/register`, details).pipe(map(response => {
      return response;
    }));
  }

  getMydetails(userId) {
    return this.http.post(`${environment.apiUrl}/customer/getMyDetails`, userId).pipe(map(response => {
      return response;
    }));
  }

  getNameList() {
    return this.http.get(`${environment.apiUrl}/admin/getCustomerList`).pipe(map(response => {
      return response;
    }));
  }

  sendFeedback(feedback: string, userId: number) {
    return this.http.post(`${environment.apiUrl}/users/addFeedBack`, [userId, feedback])
      .pipe(map(response => {
        return response;
        }
      ));
  }

}
