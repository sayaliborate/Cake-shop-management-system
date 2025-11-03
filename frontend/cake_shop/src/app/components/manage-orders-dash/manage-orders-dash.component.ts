import { Component, OnInit } from '@angular/core';
import { ManageOrdersService, Order } from '../../service/manage-orders.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-orders-dash',
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-orders-dash.component.html',
  styleUrl: './manage-orders-dash.component.css'
})
export class ManageOrdersDashComponent implements OnInit {
    orders: Order[] = [];
  loading = false;
  error: string | null = null;

  constructor(private cakeService: ManageOrdersService) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading = true;
    this.cakeService.getOrders().subscribe({
      next: (data) => {
        console.log("retrived",data);
        
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load orders';
        console.error(err);
        this.loading = false;
      }
    });
  }
}