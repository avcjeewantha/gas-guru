import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../_helpers/must-match.validator';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgbDateParserFormatter, NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
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
  public dob: any;
  public isViewOnly: boolean;
  public isEdit: boolean;
  public customer: any;
  public new: boolean;



  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: DataService, private dateparser: NgbDateParserFormatter,
              public dialogRef: MatDialogRef<RegistrationFormComponent>, private config: NgbDatepickerConfig) {
    this.linkColor = '#0000ff';
    this.new = false;
    const current = new Date();
    config.maxDate = { year: current.getFullYear(), month:
        current.getMonth() + 1, day: current.getDate() };
    config.outsideDays = 'hidden';

    if (data) {
      this.new = this.data.isnew;
      this.isViewOnly = this.data.isViewOnly;
      this.isEdit = this.data.isEditMode;

      if (!this.new) {

      } else {
        this.registerForm = this.formBuilder.group({
          fullname: [],
          email: [],
          address: [],
          tempDateOfBirth: [],
          nic: [],
          telNo: [],
          tempPhoto: [],
          tempPhotoOfVehicle: [],
          typeOfVehicle: [],
          modleOfVehicle: [],
          colorOfVehicle: [],
          username: [],
          password: [],
          confirmPassword: [],
        });
      }

    }
  }

  get f() { return this.registerForm.controls; } // convenience getter for easy access to form fields

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      tempDateOfBirth: ['', Validators.required],
      dateOfBirth: this.dob,
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
    if (this.registerForm.controls.tempDateOfBirth.value !== '') {
      this.dob = this.dateparser.format(this.registerForm.controls.tempDateOfBirth.value);
    }
    this.submitted = true;
    if (this.registerForm.invalid) {    // stop here if form is invalid
      return;
    }
    this.registerForm.controls.photo.setValue(this.imageUrl1);
    this.registerForm.controls.photoOfVehicle.setValue(this.imageUrl2);
    this.registerForm.controls.dateOfBirth.setValue(this.dob);
    this.dataService.register(this.registerForm.value).subscribe(response => {
      this.res = response;
      if (this.res.status === 200) {
        alert('Successfully Registered!');
        this.close();
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

  close() {
    this.dialogRef.close();
  }

}
