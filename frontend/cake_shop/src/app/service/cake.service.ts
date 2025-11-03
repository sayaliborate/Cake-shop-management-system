import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cake } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  private apiUrl = 'http://your-backend-url/cakes'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Fetch cakes
  getCakes(): Observable<Cake[]> {
    return this.http.get<Cake[]>(this.apiUrl);
  }

  // Add a new cake
  addCake(formData: FormData): Observable<Cake> {
    return this.http.post<Cake>(`${this.apiUrl}/add`, formData);
  }
}