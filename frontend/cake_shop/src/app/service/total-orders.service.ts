import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../add-cakes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalOrdersService {
private baseUrl = 'http://127.0.0.1:8000/orders/orders-list/';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

}
