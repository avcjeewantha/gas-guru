import { Component} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent {
  public staRes: any;
  public customers: any;

  constructor(private dataService: DataService) {
    this.dataService.getNameList().subscribe(response => {
        this.staRes = response;
        this.customers = this.staRes.cusList;
    });
  }

}
