import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Cake, Feedback } from '../../models/register';
import { CakeService } from '../../service/cake.service';
import { FeedbackService } from '../../service/feedback.service';

@Component({
  selector: 'app-manage-cakes',
  imports: [FormsModule,CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './manage-cakes.component.html',
  styleUrl: './manage-cakes.component.css'
})
export class ManageCakesComponent implements OnInit {
  feedbacks: Feedback[] = [];
  loading = true;
  error = '';

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.feedbackService.getFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load feedbacks.';
        this.loading = false;
      }
    });
  }
}