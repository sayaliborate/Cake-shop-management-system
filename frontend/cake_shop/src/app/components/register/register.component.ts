import { Component } from '@angular/core';
import { Register } from '../../models/register';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,RouterModule,FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: Register = new Register();
  
  constructor(private registerService: RegisterService) {}

  onSubmit() {
    this.registerService.registerUser(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
        alert('Registration successful!');
        this.user = new Register(); // Reset user object
      },
      error => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }
}