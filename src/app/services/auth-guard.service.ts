import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {

    const uriEnc = encodeURIComponent(state.url);
    const uriDec = decodeURIComponent(uriEnc);

    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: uriDec } });
      return false;
    }
  }
}
