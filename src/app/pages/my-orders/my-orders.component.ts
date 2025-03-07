import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { OrdersService } from '../../core/services/orders.service';
import { CartItem, Iorders } from '../../shared/interfaces/Iorders/iorders';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [DatePipe],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  private readonly authService = inject(AuthService);
  private readonly ordersService = inject(OrdersService);

   ordersData:WritableSignal<Iorders[]>=signal([]);

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
        this.ordersData.set(res);
      }
    });
  }

  getProductNames(cartItems: CartItem[] | undefined): string {
    if (!cartItems || cartItems.length === 0) {
      return 'No Products';
    }
    return cartItems
      .map(item => item.product?.title ?? 'Unknown Product')
      .join(', ');
  }


}
