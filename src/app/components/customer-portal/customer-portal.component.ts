import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
@Component({
  selector: 'app-customer-portal',
  templateUrl: './customer-portal.component.html',
  styleUrls: ['./customer-portal.component.css']
})
export class CustomerPortalComponent implements OnInit {
  lat: number;
  lng: number;
  public staRes: any;
  public stations = [];
  selectedStation: any;
  private set: boolean;

  constructor(private dataService: DataService) {
    this.getUserLocation();
    this.dataService.getLocationsAll().subscribe(response => {
      this.staRes = response;
      this.stations = this.staRes.locations;
    });
  }

  ngOnInit() {
    this.getUserLocation();
  }

  private getUserLocation() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.set = true;
      });
    }
  }

  changeClient(station) {
    this.set = false;
    this.dataService.getLocationsAll().subscribe(response => {
      this.staRes = response;
      this.stations = this.staRes.locations;
      this.getUserLocation();
    });
  }

  private getStatus(vCount: number) {
    if (vCount < 5) {
      return 'Low';
    } else if (vCount < 9) {
      return 'Medium';
    } else {
      return 'High';
    }
  }
}
