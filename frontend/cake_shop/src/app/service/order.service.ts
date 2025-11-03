import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
   private apiUrl = ' http://127.0.0.1:8000/orders/place-order/'; // Update as per your backend

  constructor(private http: HttpClient) {}

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }
  
}  