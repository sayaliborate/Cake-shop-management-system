import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/user/api/get-username/';

  constructor(private http: HttpClient) { }

  getUsername(username: string) {
    return this.http.post<any>(this.apiUrl, { username });
  }
  
  
}
