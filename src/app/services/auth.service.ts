import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  result: any;

  constructor(private http: HttpClient
  ) { }

  login(credentials) {
    return this.http.post('http://localhost:8080/users/login', credentials)
      .pipe(map((response: Response)  => {
        this.result = response.json();
        if (this.result.error === 0 && this.result.token) {
          localStorage.setItem('token', this.result.token);
          return true;
        }
        return false;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  get currentUsername() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      const jwthelper = new JwtHelper();
      return jwthelper.decodeToken(token).payload.firstname.concat(' ').concat(jwthelper.decodeToken(token).payload.lastname);
    }
  }

  get currentUserId() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      const jwthelper = new JwtHelper();
      return jwthelper.decodeToken(token).payload.id;
    }
  }

  get currentUserfname() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      const jwthelper = new JwtHelper();
      return jwthelper.decodeToken(token).payload.firstname;
    }
  }

  get currentUserlname() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      const jwthelper = new JwtHelper();
      return jwthelper.decodeToken(token).payload.lastname;
    }
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    const jwthelper = new JwtHelper();
    return jwthelper.decodeToken(token).payload;
  }

  register(data) {
    return this.http.post('http://localhost:8080/api/newapplication', data).pipe(map(response => {
      return !!response;
    }));
  }
}
