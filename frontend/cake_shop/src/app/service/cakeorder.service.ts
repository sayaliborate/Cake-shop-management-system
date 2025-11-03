import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// cakeorder.service.ts
export interface Order {
  id: number;
  customer_name: string;
  phone_number: string;
  address: string;
  cake_name: string;
  cake: string;
  weight: string;
  custom_weight: string;
  quantity: number;
  delivery_date: string;
  order_date: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CakeorderService {
 private baseUrl = 'http://127.0.0.1:8000/orders/get-all-orders/';
  private updateStatusUrl = 'http://127.0.0.1:8000/orders/update-order-status/';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  // Use POST instead of PUT
  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    return this.http.post(`${this.updateStatusUrl}${orderId}/`, { status: newStatus });
  }


}
