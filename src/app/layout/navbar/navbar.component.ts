import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly authService=inject(AuthService);
  private readonly cartService=inject(CartService);
  isLogin = computed(() => !!this.authService.userData());
  countCart! :number;

  ngOnInit(): void {
    if(this.isLogin()){
      this.cartService.cartNumbers.subscribe({
        next:(value)=>{
          this.countCart=value;
        }
      })
      this.cartService.getLoggedUserCart().subscribe({
        next:(res)=>{
          this.cartService.cartNumbers.next(res.numOfCartItems)
        }
      })
    }
  }
}
