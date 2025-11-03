import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOrderHistoryService {
  private baseUrl: string = 'http://127.0.0.1:8000/order/order-history/';  // ✅ Declare baseUrl properly

  constructor(private http: HttpClient) {}

  getOrderHistory(): Observable<any> {
    const token = localStorage.getItem('token'); // ✅ make sure it's saved during login
  
    if (!token) {
      console.error('❌ No token found in localStorage!');
      return of(null); // return empty observable
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}` // ✅ CORRECT — no extra path after token
    });
  
    return this.http.get(this.baseUrl, { headers });
  }
  
  
}

  
  

