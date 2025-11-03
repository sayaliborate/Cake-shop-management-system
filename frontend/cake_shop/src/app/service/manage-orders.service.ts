import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
export interface Order {
  id: number;
  cake: number;
  customer_name: string;
  address: string;
  weight: number | string;
  custom_weight: number | null;
  quantity: number;
  status: string;
  // Add other order properties as needed
}
@Injectable({
  providedIn: 'root'
})
export class ManageOrdersService {
  private getOrdersUrl = 'http://127.0.0.1:8000/cakes/orders/';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.getOrdersUrl);
  }

  // other existing methods...
}