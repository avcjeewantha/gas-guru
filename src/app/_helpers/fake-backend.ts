import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {User} from '../_models/user';
import {Locations} from '../_models/locations';

const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXN' +
  'lclR5cGUiOiJhZG1pbiIsImVycm9yIjowfQ.XCFyR2PeN9Z1uoEW6_ESCTXPUvCkRAca-_yYphOi8No';
const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMyIsImVtYWlsIjoiY3VzdG9tZXIxQGdtYWlsLmNvbSIs' +
  'InVzZXJUeXBlIjoiY3VzdG9tZXIiLCJlcnJvciI6MH0.PMLkl9UQtxVjnuT7N8_CJKHY895MGW5AGT82tVpmMuU';
const token3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNCIsImVtYWlsIjoiY3VzdG9tZXIyQGdtYWlsLmNvbSIsInVz' +
  'ZXJUeXBlIjoiY3VzdG9tZXIiLCJlcnJvciI6MH0.s34r71Mtgtl5foXy7yjz4kKOlPFak8pz9xjBWXuVgIQ';

const users: User[] = [
  { userId: 12, email: 'admin@gmail.com', userType: 'admin', password: 'admin', token: token1 },
  { userId: 13, email: 'customer1@gmail.com', userType: 'customer', password: 'customer', token: token2 },
  { userId: 14, email: 'customer2@gmail.com', userType: 'customer', password: 'customer', token: token3 }
  ];

const locations: Locations[] = [
    {latitude: 6.989500, longitude: 81.055702},
    {latitude: 6.982522, longitude: 81.058807},
    {latitude: 6.998645, longitude: 81.057198},
    {latitude: 6.934718, longitude: 81.155411 },
    {latitude: 6.986600, longitude: 81.057503 },
    {latitude: 6.960300, longitude: 81.035500 }
];

@Injectable()
export class FakeBackend implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const { url, method, headers, body } = request;
    return of(null) // wrap in delayed observable to simulate server api call
    .pipe(mergeMap(handleRoute))
    .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is
                              // thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
    .pipe(delay(500))
    .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/admin/getLocationsAll') && method === 'GET':
          return getLocationsAll();
        default: // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function authenticate() {
      const { email, password } = body;
      const user = users.find(x => x.email === email && x.password === password);
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        error: 0,
        token: user.token,
      });
    }

    function getUsers() {
      if (!isLoggedIn()) { return unauthorized(); }
      return ok(users);
    }

    // tslint:disable-next-line:no-shadowed-variable
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return of(new HttpResponse({ status: 406, body: { message}}));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === `Basic ${window.btoa('test:test')}`;
    }

    function getLocationsAll() {
      return ok({
        locations
      });
    }
  }
}

export let fakeBackendProvider = { // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackend,
  multi: true
};
