import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../service/feedback.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
   feedbackForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  get f() {
    return this.feedbackForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.feedbackForm.invalid) {
      return;
    }

    this.feedbackService.submitFeedback(this.feedbackForm.value).subscribe({
      next: () => {
        this.successMessage = 'Thank you for your feedback!';
        this.feedbackForm.reset();
        this.submitted = false;
      },
      error: () => {
        this.errorMessage = 'Oops! Something went wrong. Please try again.';
      }
    });
  }
}