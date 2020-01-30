import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(private authService: AuthService, private router: Router) { }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  navigateToPortal() {
    if (this.authService.currentUser.userType === 'admin') {
      this.router.navigate(['/portal/admin'], { queryParams: { category: 'ahome' } });
    } else if (this.authService.currentUser.userType === 'customer') {
      this.router.navigate(['/portal/customer'], { queryParams: { category: 'chome' } });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
