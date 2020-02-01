import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-customer-portal',
  templateUrl: './customer-portal.component.html',
  styleUrls: ['./customer-portal.component.css']
})
export class CustomerPortalComponent implements OnInit {

  constructor() { }
  lat: number;
  lng: number;

  ngOnInit() {
    this.getUserLocation();
  }

  private getUserLocation() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
}
