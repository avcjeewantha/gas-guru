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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {fakeBackendProvider} from './_helpers/fake-backend';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';
import { CustomerPortalComponent } from './components/customer-portal/customer-portal.component';
import {AuthGuard} from './services/auth-guard.service';
import {CustomerAuthGuardService} from './services/customer-auth-guard.service';
import {AdminAuthGuardService} from './services/admin-auth-guard.service';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment';
import {DataService} from './services/data.service';
import {MatCardModule, MatDialogModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { FeedBackComponent } from './components/feed-back/feed-back.component';

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
    RegistrationFormComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    FeedBackComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: GasGuruHomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'customerList', component: CustomerListComponent, canActivate: [AuthGuard, AdminAuthGuardService]},
      {path: 'portal/admin', component: AdminPortalComponent, canActivate: [AuthGuard, AdminAuthGuardService]},
      {path: 'portal/customer', component: CustomerPortalComponent, canActivate: [AuthGuard, CustomerAuthGuardService]},
      {path: 'accessdenied', component: AccessDeniedComponent}
    ]),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule
  ],
  entryComponents: [
    RegistrationFormComponent,
    CustomerDetailsComponent,
    FeedBackComponent
  ],
  providers: [
    AuthService,
    DataService,
    // provider used to create fake backend
    fakeBackendProvider,
    AdminAuthGuardService,
    CustomerAuthGuardService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
