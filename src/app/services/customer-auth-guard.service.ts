import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthGuardService {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    if (this.authService.currentUser.userType === 'customer') {
      return true;
    } else {
      this.router.navigate(['/accessdenied']);
      return false;
    }
  }
}
