import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
private apiUrl = 'http://127.0.0.1:8000/api/feedback/';

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }
}