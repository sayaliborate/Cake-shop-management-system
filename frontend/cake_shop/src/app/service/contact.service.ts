import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Contact {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class ContactService {
private apiUrl = 'http://127.0.0.1:8000/api/contact/contact/'; // Change if needed

  constructor(private http: HttpClient) {}

  sendContact(contact: Contact): Observable<any> {
    return this.http.post(this.apiUrl, contact);
  }

   private baseUrl = 'http://127.0.0.1:8000/api/contact/all/';  // Adjust port if needed


  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl);
  }
}
