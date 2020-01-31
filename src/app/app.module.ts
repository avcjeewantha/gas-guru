import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GasGuruHomeComponent } from './components/gas-guru-home/gas-guru-home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {fakeBackendProvider} from './_helpers/fake-backend';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';
import { CustomerPortalComponent } from './components/customer-portal/customer-portal.component';
import {AuthGuard} from './services/auth-guard.service';
import {CustomerAuthGuardService} from './services/customer-auth-guard.service';
import {AdminAuthGuardService} from './services/admin-auth-guard.service';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BsNavbarComponent,
    GasGuruHomeComponent,
    CarouselComponent,
    AdminPortalComponent,
    CustomerPortalComponent,
    AccessDeniedComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: GasGuruHomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'portal/admin', component: AdminPortalComponent, canActivate: [AuthGuard, AdminAuthGuardService]},
      {path: 'portal/customer', component: CustomerPortalComponent, canActivate: [AuthGuard, CustomerAuthGuardService]},
      {path: 'accessdenied', component: AccessDeniedComponent}
    ]),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    AuthService,
    // provider used to create fake backend
    fakeBackendProvider,
    AdminAuthGuardService,
    CustomerAuthGuardService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
