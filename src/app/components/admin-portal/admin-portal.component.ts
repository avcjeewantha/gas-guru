import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {
  public staRes: any;
  public stations = [];
  lat: number;
  lng: number;

  constructor(private dataService: DataService) {
    this.dataService.getLocationsAll().subscribe(response => {
      this.staRes = response;
      this.stations = this.staRes.locations;
    });
  }

  ngOnInit() {
    this.getUserLocation();
    this.dataService.getLocationsAll().subscribe(response => {
      this.staRes = response;
      this.stations = this.staRes.locations;
    });
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

  private getStatus(vCount: number) {
    if (vCount < 5) {
      return 'Low';
    } else if (vCount < 9) {
      return 'Medium';
    } else {
      return 'High';
    }
  }

  onKey(sId: number, vCount: number) {
    this.dataService.setlocation(sId, Number(vCount));
  }

}
