import { Component, OnInit } from '@angular/core';
import { UserOrderHistoryService } from '../../service/user-order-history.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AddCakesService, Cake, Order } from '../../add-cakes.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
interface OrderForm {
  customer_name: string;
  address: string;
  phone_number: string;
  weight: number | null;
  custom_weight: number | null;
  quantity: number | null;
  cake: number | null;
  transaction_id?: string | null;
}

@Component({
  selector: 'app-user-order-history',
  imports: [CommonModule,RouterModule,QRCodeComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './user-order-history.component.html',
  styleUrl: './user-order-history.component.css'
})



export class UserOrderHistoryComponent implements OnInit{
   cakes: Cake[] = [];
  selectedCake: Cake | null = null;

  orderForm: OrderForm = {
    customer_name: '',
    address: '',
    phone_number: '',
    weight: null,
    custom_weight: null,
    quantity: null,
    cake: null,
    transaction_id: null
  };

  qrData: string = '';

  showOrderForm = false;
  showPaymentOptions = false;
  showQRCode = false;
  showScanner = false;

  constructor(private cakeService: AddCakesService) {}

  ngOnInit(): void {
    this.getCakes();
  }

  getCakes() {
    this.cakeService.getCakeList().subscribe({
      next: (data) => (this.cakes = data),
      error: (err) => {
        alert('Error fetching cakes!');
        console.error(err);
      }
    });
  }

  openOrderForm(cake: Cake) {
    this.selectedCake = cake;
    this.resetOrderForm();
    this.orderForm.cake = cake.id ?? null;
    this.showOrderForm = true;
  }

  cancelOrderForm() {
    this.showOrderForm = false;
    this.resetOrderForm();
  }

  resetOrderForm() {
    this.orderForm = {
      customer_name: '',
      address: '',
      phone_number: '',
      weight: null,
      custom_weight: null,
      quantity: null,
      cake: this.selectedCake?.id ?? null,
      transaction_id: null
    };
    this.qrData = '';
  }

  submitOrderForm() {
    if (
      !this.orderForm.customer_name ||
      !this.orderForm.address ||
      !this.orderForm.weight ||
      !this.orderForm.quantity
    ) {
      alert('Please fill all required fields.');
      return;
    }
    this.showOrderForm = false;
    this.showPaymentOptions = true;
  }

  cancelPaymentOptions() {
    this.showPaymentOptions = false;
    this.resetAll();
  }

  selectOnlinePayment() {
    this.showPaymentOptions = false;
    this.showQRCode = true;

    if (this.selectedCake && this.orderForm.quantity && this.selectedCake.price) {
      const totalAmount = this.selectedCake.price * this.orderForm.quantity;
      this.qrData = `upi://pay?pa=yourshop@upi&pn=CakeShop&am=${totalAmount}&cu=INR`;
    }
  }

  selectCOD() {
    this.showPaymentOptions = false;
    this.showScanner = true;
  }

confirmPayment() {
  if (!this.orderForm.transaction_id || !this.orderForm.transaction_id.trim()) {
    alert('Please enter the transaction ID.');
    return;
  }

  const orderPayload: Order = {
    cake: this.orderForm.cake!,
    customer_name: this.orderForm.customer_name,
    address: this.orderForm.address,
    phone_number: this.orderForm.phone_number,
    weight: this.orderForm.weight!,
    custom_weight: this.orderForm.custom_weight,
    quantity: this.orderForm.quantity!,
    payment_method: 'online',
    payment_status: 'sold',
    status: 'Confirmed',       // Mark order as confirmed here
    order_date: new Date(),    // current date/time
    delivery_date: null,
    cake_name: this.selectedCake?.name || '',
    transaction_id: this.orderForm.transaction_id.trim()
  };

  this.placeOrder(orderPayload);
}


confirmCOD() {
  const orderPayload: Order = {
    cake: this.orderForm.cake!,
    customer_name: this.orderForm.customer_name,
    address: this.orderForm.address,
    phone_number: this.orderForm.phone_number,
    weight: this.orderForm.weight!,
    custom_weight: this.orderForm.custom_weight,
    quantity: this.orderForm.quantity!,
    payment_method: 'online', // or 'cod'
    order_date: new Date(),
    delivery_date: null,
    cake_name: this.selectedCake?.name || '',
    payment_status: 'sold',
    status: 'Confirmed',
    transaction_id: null
  };


  this.placeOrder(orderPayload);  // actual saving here
}


  placeOrder(orderPayload: Order) {
    this.cakeService.saveOrder(orderPayload).subscribe({
      next: (response) => {
        alert('Order placed successfully!');
        this.resetAll();
      },
      error: (error) => {
        alert('Failed to place order: ' + (error.message || error));
        console.error('Order error:', error);
      }
    });
  }

  closeScanner() {
    this.showScanner = false;
  }

  resetAll() {
    this.showOrderForm = false;
    this.showPaymentOptions = false;
    this.showQRCode = false;
    this.showScanner = false;
    this.selectedCake = null;
    this.resetOrderForm();
  }
}