import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  getLocationsAll() {
    return this.http.get('http://localhost:4000/admin/getLocationsAll').pipe(map(response => {
      return response;
    }));
  }

  setlocation(sId: number, vCount: number) {
    const data = { sId, vCount };
    console.log(data);
    return this.http.post('http://localhost:4000/admin/setlocation', data).pipe(map(response => {
      return response;
    }));
  }

}
