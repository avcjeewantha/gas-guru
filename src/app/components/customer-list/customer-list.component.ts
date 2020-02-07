import { Component} from '@angular/core';
import {DataService} from '../../services/data.service';
import {MatDialog} from '@angular/material';
import {CustomerDetailsComponent} from '../customer-details/customer-details.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent {
  public staRes: any;
  public details: any;
  public customers: any;

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.dataService.getNameList().subscribe(response => {
        this.staRes = response;
        this.customers = this.staRes;
    });
  }

  showDetails(username: string) {
    this.dataService.getMydetails(username).subscribe(response => {
      this.details = response;
      const dialogRef = this.dialog.open(CustomerDetailsComponent, {
        width: '1000px',
        height: '530px',
        data: { title: 'Details', isViewOnly: true, isEditMode: false, isnew: false, customerEntity: this.details}
      });
    });
  }

}
