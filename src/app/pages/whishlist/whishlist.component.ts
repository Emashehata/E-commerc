import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Data, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WhishListService } from '../../core/services/whish-list.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-whishlist',
  imports: [RouterLink],
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.css'
})
export class WhishlistComponent {
       private readonly toastrService=inject(ToastrService);
       private readonly whishListService=inject(WhishListService);
       private readonly cartService=inject(CartService);
       whishlistData:WritableSignal<IProduct[]>=signal([]);



       ngOnInit(): void {
        this.getUserWhishlist();
       }
       getUserWhishlist():void{
        this.whishListService.getLoggedUserWhishlist().subscribe({
          next:(res)=>{
            if(res.status=='success'){
              this.whishlistData.set(res.data);
              console.log(this.whishlistData());
              console.log(res);


            }

          }
        })
      }


      addProductToCart(id:string):void{
        this.cartService.addProductToCart(id).subscribe({
          next:(res)=>{
            console.log(res);
            if(res.status=='success'){
              this.toastrService.success(res.message);
              this.cartService.cartNumbers.next(res.numOfCartItems);
            }

          }
        })
    }



    removeWhishlistItem(id:string):void{
      this.whishListService.removeSpecificwhishlistItem(id).subscribe({
        next:(res)=>{
          console.log(res.data.length);
          if(res.status=='success'){
            // this.whishlistData.set(res.data);
            this.getUserWhishlist();
            this.toastrService.success(res.message);
            this.whishListService.whishlistNumbers.next(res.data.length);
          }

        }
      })
  }
}
