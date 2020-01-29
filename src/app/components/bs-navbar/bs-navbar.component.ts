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
    if (this.authService.currentUser.type === 'admin') {
      this.router.navigate(['/portal/admin'], { queryParams: { category: 'addcount' } });
    } else if (this.authService.currentUser.type === 'customer') {
      this.router.navigate(['/portal/customer'], { queryParams: { category: 'vehiclequeue' } });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
