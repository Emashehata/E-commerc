import { Component, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-my-orders',
  imports: [],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  private readonly authService = inject(AuthService);
  private readonly ordersService = inject(OrdersService);

  constructor() {
    effect(() => {
      const userId = this.authService.userID(); // ✅ Extract signal value
      if (userId) {
        this.getUserOrders(userId);
      }
    });
  }

  getUserOrders(userId: string): void {
    this.ordersService.getUserOrders(userId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }
}
