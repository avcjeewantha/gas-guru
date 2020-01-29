import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { AuthService } from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GasGuruHomeComponent } from './components/gas-guru-home/gas-guru-home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BsNavbarComponent,
    GasGuruHomeComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: GasGuruHomeComponent },
      { path: 'login', component: LoginComponent }
    ]),
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
