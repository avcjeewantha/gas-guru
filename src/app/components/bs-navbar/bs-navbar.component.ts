import {ActivatedRoute, Router} from '@angular/router';
import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {RegistrationFormComponent} from '../registration-form/registration-form.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  category: string;
  dialogOpened: boolean;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, public dialog: MatDialog) {
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
    });
    this.dialogOpened = true;
  }

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

  openRegisterForm() {
    this.openDialog();
  }

  openDialog(): void {
    this.dialogOpened = false;
    const dialogRef = this.dialog.open(RegistrationFormComponent, {
      width: '1000px',
      height: '530px',
      data: { title: 'Registration form' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpened = true;
    });
  }

}
