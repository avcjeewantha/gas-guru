import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../_helpers/must-match.validator';
import {MAT_DIALOG_DATA} from '@angular/material';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  model: NgbDateStruct;
  public imageUrl1: string;
  public imageUrl2: string;
  public imagefile: File;
  public linkColor: string;
  public res: any;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) {
    this.linkColor = '#0000ff';
  }

  get f() { return this.registerForm.controls; } // convenience getter for easy access to form fields

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nic: ['', Validators.required],
      telNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      tempPhoto: ['', Validators.required],
      photo: this.imageUrl1,
      tempPhotoOfVehicle: ['', Validators.required],
      photoOfVehicle: this.imageUrl2,
      typeOfVehicle: ['', Validators.required],
      modleOfVehicle: ['', Validators.required],
      colorOfVehicle: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {    // stop here if form is invalid
      return;
    }
    this.registerForm.controls.photo.setValue(this.imageUrl1);
    this.registerForm.controls.photoOfVehicle.setValue(this.imageUrl2);
    console.log(this.registerForm.value);
    this.dataService.register(this.registerForm.value).subscribe(response => {
      this.res = response;
      if (this.res.status === 200) {
        alert('Successfully Registered!');
      } else {
        alert('Error in Registering!');
      }
    });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.imageUrl1 = '';
    this.imageUrl2 = '';
  }

  public fileChange(imagefile: any, option: number): void {
    this.imagefile = imagefile.target.files[0];
    if (this.imagefile) {
      if ('image/png/image/jpg/image/jpeg/image/gif'.includes(this.imagefile.type.toString())) {
        const reader = new FileReader();
        if (option === 1) {
          reader.onload = this._handleReaderLoaded1.bind(this);
        } else if (option === 2) {
          reader.onload = this._handleReaderLoaded2.bind(this);
        }
        reader.readAsBinaryString(this.imagefile);
      } else {
        alert('Only jpg/jpeg/gif and png files are allowed!');
      }
    }
  }

  public _handleReaderLoaded1(readerEvt: any): void {
    const binaryString = readerEvt.target.result;
    this.imageUrl1 = btoa(binaryString);
    this.imageUrl1 = `data:image/png;base64,${this.imageUrl1}`;
  }

  public _handleReaderLoaded2(readerEvt: any): void {
    const binaryString = readerEvt.target.result;
    this.imageUrl2 = btoa(binaryString);
    this.imageUrl2 = `data:image/png;base64,${this.imageUrl2}`;
  }

  setColor(newColor) {
    this.linkColor = newColor;
  }

}
