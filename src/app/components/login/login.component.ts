import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  invalidLogin: boolean;
  message: string;
  constructor(
    private router: Router,
    private authservice: AuthService,
    private route: ActivatedRoute) {
    this.invalidLogin = false;
    const returnurl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnurl) {
      this.invalidLogin = true;
      this.message = 'You have to login first';
    }
  }

  signIn(credentials) {
    this.authservice.login(credentials).subscribe(response => {
      if (response) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        const action = this.route.snapshot.queryParamMap.get('action');
        const uriDec = decodeURIComponent(returnUrl);
        if (returnUrl) {
          this.router.navigateByUrl(uriDec);
        } else {
          this.router.navigate(['/']);
        }

      } else {
        this.invalidLogin = true;
        this.message = 'Invalid email or password';
      }
    });
  }



}