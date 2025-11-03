import { CommonModule } from '@angular/common';
import {  ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.Default

})
export class NavbarComponent implements OnInit {
  dropdownOpen: boolean = false;
  role: string = '';  // Declare the role property

  ngOnInit(): void {
    // Fetch the role from localStorage or any other service
    this.role = localStorage.getItem('role') || '';
    console.log('Current role:', this.role); 
   }
  
  toggleDropdown() {
    console.log("this.dropdownOpen 1",this.dropdownOpen );
    this.dropdownOpen = !this.dropdownOpen;  // Toggle the dropdown state
    console.log("this.dropdownOpen ",this.dropdownOpen );
    
  }

  closeDropdown() {
    this.dropdownOpen = false;  // Close dropdown if clicking outside
  }

  logout() {
    localStorage.removeItem('role');
    window.location.reload(); // To reflect the logout in UI
  }
  
}
