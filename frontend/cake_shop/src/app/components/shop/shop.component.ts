import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { OrderService } from '../../service/order.service';
import { Order } from '../../models/register';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-shop',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})

export class ShopComponent implements OnInit{
  cakes = [
    { name: 'Chocolate Delight', image: 'assets/images/s1.jpg', price: 15.99 },
    { name: 'Vanilla Heaven', image: 'assets/images/s2.avif', price: 12.99 },
    { name: 'Strawberry Bliss', image: 'assets/images/str.jpg', price: 14.99 },
    { name: 'Red Velvet', image: 'assets/images/s4.jpg', price: 18.99 },
    { name: 'Black Forest', image: 'assets/images/s5.avif', price: 16.99 }
  ];

  constructor(private orderService: OrderService) {}

  cartItems: any[] = [];
  total = 0;
  name = 'Customer';

  selectedCake: any = null;

  orderCustomer = {
  name: '',
  email: '',
  phone: '',
  address: '',
  deliveryDate: ''
};


  today: string = '';

  ngOnInit() {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0]; // yyyy-mm-dd
  }

  openOrderForm(cake: any) {
    this.selectedCake = cake;
    this.orderCustomer = {
       name: '',
  email: '',
  phone: '',
  address: '',
  deliveryDate: ''
    };
  }

 submitOrder() {
  const customer = this.orderCustomer;

  if (customer.name && customer.email && customer.phone && customer.address && customer.deliveryDate) {
    const orderPayload = {
      customer_name: customer.name,
      email: customer.email,
      phone_number: customer.phone,
      address: customer.address,
      cake_name: this.selectedCake.name,
      delivery_date: customer.deliveryDate
    };

    this.orderService.placeOrder(orderPayload).subscribe({
      next: (res) => {
        alert(`🎉 Order placed successfully for ${orderPayload.cake_name}!`);
        this.cartItems.push(this.selectedCake);
        this.total += this.selectedCake.price;
        this.selectedCake = null;
      },
      error: (err) => {
        console.error('Order failed:', err);
        alert('❌ Failed to place order. Please try again later.');
      }
    });
  } else {
    alert('❗ Please fill all order details.');
  }
}

  cancelOrder() {
    this.selectedCake = null;
  }

  clearCart() {
    this.cartItems = [];
    this.total = 0;
  }

}

