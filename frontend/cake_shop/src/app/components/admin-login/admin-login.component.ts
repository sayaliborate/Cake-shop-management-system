import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// import { Router } from 'express';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  adminLoginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.adminLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onAdminLogin() {
    const username = this.adminLoginForm.value.username;
    const password = this.adminLoginForm.value.password;

    if (username === 'admin' && password === 'Admin@123') {
      localStorage.setItem('role', 'admin');
      this.router.navigate(['/admin-dashboard']).then(() => {
        window.location.reload();  // ✅ This will refresh the navbar to pick up new role
      });
    } else {
      this.loginError = 'Invalid admin credentials!';
    }
  }
}