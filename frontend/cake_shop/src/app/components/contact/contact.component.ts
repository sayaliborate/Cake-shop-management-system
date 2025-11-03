import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact, ContactService } from '../../service/contact.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
 contactForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contactData: Contact = this.contactForm.value;
      this.contactService.sendContact(contactData).subscribe({
        next: (response) => {
          this.successMessage = 'Message sent successfully!';
          this.errorMessage = '';
          this.contactForm.reset();
        },
        error: (error) => {
          this.errorMessage = 'Failed to send message.';
          this.successMessage = '';
        },
      });
    }
  }
}