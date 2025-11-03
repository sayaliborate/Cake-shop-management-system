import { Component } from '@angular/core';
import { Contact, ContactService } from '../../service/contact.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-ret',
  imports: [CommonModule,RouterModule],
  templateUrl: './contact-ret.component.html',
  styleUrl: './contact-ret.component.css'
})
export class ContactRetComponent {
contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe(
      (data) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }
}