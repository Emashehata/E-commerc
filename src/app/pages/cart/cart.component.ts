import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../shared/interfaces/Icart/icart';
import { Data, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
    private readonly cartService=inject(CartService);
    private readonly toastrService=inject(ToastrService);
    cartData: WritableSignal<Data | null> = signal(null);

    ngOnInit(): void {
      this.getUserCart();
    }
    getUserCart():void{
      this.cartService.getLoggedUserCart().subscribe({
        next:(res)=>{
          console.log(res.data);
          if(res.status=='success'){
            this.cartData.set(res.data);
          }

        }
      })
    }

    removeCartItem(id:string):void{
      this.cartService.removeSpecificCartItem(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.cartData.set(res.data);
          this.toastrService.success('Product is deleted from your Cart suuccessfully');
          this.cartService.cartNumbers.next(res.numOfCartItems);

        }
      })
  }


  updateCountProduct(id:string,count:number):void{
    this.cartService.updateProductQuantity(id,count).subscribe({
      next:(res)=>{
        console.log(res);
        // this.toastrService.success(res.message);
        this.cartData.set(res.data);

      }

    })
  }


  clearCartItems():void{
    this.cartService.removeAllCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message==='success'){
          this.cartData.set(null);
          this.toastrService.success('All products are deleted successfully');
          this.cartService.cartNumbers.next(0);
        }

      }

    })
  }
}
