import { WhishListService } from './../../core/services/whish-list.service';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly whishListService =inject(WhishListService)

  isLogin = computed(() => !!this.authService.userData());
  countCart = signal(0); // Reactive signal for cart count
  countWhishlist= signal(0);

  constructor() {
    // Effect runs when isLogin changes
    effect(() => {
      if (this.isLogin()) {
        console.log('User is logged in, fetching cart data...');
        /*********cart********* */
        this.cartService.cartNumbers.subscribe({
          next: (value) => {
            this.countCart.set(value); // Update signal value
            console.log('Updated Cart Count:', value);
          }
        });

        this.cartService.getLoggedUserCart().subscribe({
          next: (res) => {
            this.cartService.cartNumbers.next(res.numOfCartItems);
          }
        });


        /********whishlist****** */
        this.whishListService.whishlistNumbers.subscribe({
          next: (value) => {
            this.countWhishlist.set(value); // Update signal value
            console.log('Updated Cart Count:', value);
          }
        });

        this.whishListService.getLoggedUserWhishlist().subscribe({
          next: (res) => {
            this.whishListService.whishlistNumbers.next(res.data.length);
          }
        });


      } else {
        console.log('User is not logged in, skipping cart fetch.');
      }
    });
  }
}
