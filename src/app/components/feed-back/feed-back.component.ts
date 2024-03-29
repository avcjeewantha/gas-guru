import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {BsNavbarComponent} from '../bs-navbar/bs-navbar.component';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent {
  public feedback: string;
  public res: any;

  constructor(public dialogRef: MatDialogRef<BsNavbarComponent>, private authService: AuthService, private dataService: DataService) {
  }

  submitFeedBack() {
    if (this.feedback !== '' && this.feedback !== undefined) {
      this.dataService.sendFeedback(this.feedback, this.authService.currentUsername).subscribe(response => {
        if (response) {
          this.res = response;
          alert('Submitted!');
          this.dialogRef.close();
        } else {
          alert('An error in submitting!');
        }
      }, error => {

      });
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

}
