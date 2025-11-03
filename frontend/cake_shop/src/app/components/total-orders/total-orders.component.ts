import { Component, OnInit } from '@angular/core';
import { Order } from '../../add-cakes.service';
import { TotalOrdersService } from '../../service/total-orders.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-total-orders',
  imports: [CommonModule,RouterModule],
  templateUrl: './total-orders.component.html',
  styleUrl: './total-orders.component.css'
})
export class TotalOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private ordersService: TotalOrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getAllOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
      }
    });
  }

  
}
