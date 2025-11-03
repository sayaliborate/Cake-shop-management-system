import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Changed from email to username
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.username, // Use username instead of email
        password: this.loginForm.value.password
      };

      this.loginService.login(loginData).subscribe(
        response => {
          console.log('Login Successful:', response);

          localStorage.setItem('username', response.username); // ✅ Now this will not be undefined
          localStorage.setItem('token', response.token); // Ensure the token is stored in localStorage


    
          // ✅ Redirect to shop
           window.location.href = '/shop';

          // window.location.href = '/user-order-history'; // ✅ Go to order history page

        },


        error => {
          this.loginError = error.error.error || 'Login failed';
          console.error('Login Error:', error);
        }
      );
    }
  }


 
}