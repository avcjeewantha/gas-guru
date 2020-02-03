import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  detailForm: FormGroup;
  model: NgbDateStruct;
  public linkColor: string;
  public imageUrl1: string;
  public imageUrl2: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CustomerDetailsComponent>,
              private formBuilder: FormBuilder) {

    this.detailForm = this.formBuilder.group({
      fullname: [this.data.customerEntity.fullname],
      email: [this.data.customerEntity.email],
      address: [this.data.customerEntity.address],
      dateOfBirth: [this.data.customerEntity.dateOfBirth],
      nic: [this.data.customerEntity.nic],
      telNo: [this.data.customerEntity.telNo],
      photo: [this.data.customerEntity.photo],
      photoOfVehicle: [this.data.customerEntity.photoOfVehicle],
      typeOfVehicle: [this.data.customerEntity.typeOfVehicle],
      modleOfVehicle: [this.data.customerEntity.modleOfVehicle],
      colorOfVehicle: [this.data.customerEntity.colorOfVehicle],
      username: [this.data.customerEntity.username]
    });
    this.imageUrl1 = this.data.customerEntity.photo;
    this.imageUrl2 = this.data.customerEntity.photo;
    this.linkColor = this.data.customerEntity.colorOfVehicle;
    this.toDate(this.data.customerEntity.dateOfBirth);
  }

  toDate(dob) {
    if (dob) {
      const [year, month, day] = dob.split('-');
      const obj = { year: Number(year), month: Number(month), day: Number(day.split(' ')[0].trim()) };
      this.model = obj;
    }
  }

}
