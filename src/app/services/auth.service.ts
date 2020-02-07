import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
  result: any;

  constructor(private http: HttpClient
  ) { }

  login(credentials) {
    return this.http.post(`${environment.apiUrl}/gasGuru/login`, credentials)
      .pipe(map(response => {
        this.result = response;
        if (this.result.token) {
          localStorage.setItem('token', this.result.token);
          return response;
        }
        return response;
      }, error => {
        return error;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  get currentUname() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      const jwthelper = new JwtHelper();
      return jwthelper.decodeToken(token).payload.firstname.concat(' ').concat(jwthelper.decodeToken(token).payload.lastname);
    }
  }

  get currentUsername() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken.sub;
    }
  }

  get currentUserId() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken.userId;
    }
  }

  get currentUserEmail() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken.email;
    }
  }

  get currentUserType() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken.userType;
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
    const helper = new JwtHelperService();
    return helper.decodeToken(token);
  }

}
