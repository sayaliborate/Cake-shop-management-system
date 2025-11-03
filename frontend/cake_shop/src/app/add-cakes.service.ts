import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
// Cake model
export interface Cake {
  id?: number;
  name: string;
  description: string;
  price: number;
    transaction_id?: string;

  image: File;
}

// Optional: Order model (can be used to make things more strongly typed)
export interface Order {
  cake: number;
  customer_name: string;
  address: string;
  phone_number: string;
  weight: number | null;
  custom_weight: number | null;
  quantity: number | null;
  payment_method: 'online' | 'cod';
  payment_status: 'sold' | 'pending';    // keep as is
  status: 'Pending' | 'Confirmed' | 'Delivered';  // new field, matches backend model
  order_date: Date;
  delivery_date: Date | null;
  cake_name: string;
  transaction_id: string | null;
}





@Injectable({
  providedIn: 'root'
})
export class AddCakesService {
private uploadCakeUrl = 'http://127.0.0.1:8000/cakes/add/';
  private getCakesUrl = 'http://127.0.0.1:8000/cakes/list/';
  private placeOrderUrl = 'http://127.0.0.1:8000/cakes/place-order/';

  constructor(private http: HttpClient) {}

  /** Upload a new cake */
  uploadCake(cake: Cake): Observable<any> {
    const formData = new FormData();
    formData.append('name', cake.name);
    formData.append('description', cake.description);
    formData.append('price', cake.price.toString());
    formData.append('image', cake.image);

    return this.http.post(this.uploadCakeUrl, formData);
  }

  /** Get list of cakes */
  getCakeList(): Observable<Cake[]> {
    return this.http.get<Cake[]>(this.getCakesUrl);
  }

  /** Save customer order */
  saveOrder(orderData: any): Observable<any> {
    return this.http.post(this.placeOrderUrl, orderData, { responseType: 'text' }).pipe(
      catchError(err => {
        console.error('Save order error:', err);
        return throwError(() => new Error('Save order failed'));
      })
    );
  }
}
