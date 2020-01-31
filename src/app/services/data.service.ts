import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getLocationsAll() {
    return this.http.get('http://localhost:4000/admin/getLocationsAll').pipe(map(response => {
      return response;
    }));
  }

}
