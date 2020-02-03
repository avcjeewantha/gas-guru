import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent {
  public staRes: any;
  public feedbacks: any;

  constructor(private dataService: DataService) {
    this.dataService.getFeedbackList().subscribe(response => {
      this.staRes = response;
      this.feedbacks = this.staRes.feedbackList;
    });
  }

}
