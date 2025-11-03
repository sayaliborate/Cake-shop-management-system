import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CakeorderService, Order } from '../../service/cakeorder.service';



@Component({
  selector: 'app-manage-orders',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent  implements OnInit {
 orders: Order[] = [];

  constructor(private ordersService: CakeorderService) {}

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

 onStatusChange(orderId: number, event: Event): void {
  const selectElement = event.target as HTMLSelectElement | null;
  if (selectElement) {
    const newStatus = selectElement.value;
    this.ordersService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
          order.status = newStatus;
        }
      },
      error: (err) => {
        console.error('Error updating order status:', err);
      }
    });
  }
}


}