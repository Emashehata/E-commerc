import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { ProductCartComponent } from "../../shared/bussines/product-cart/product-cart.component";
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishListService } from '../../core/services/whish-list.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, ProductCartComponent,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  private readonly productsService= inject(ProductsService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  private readonly whishListService=inject(WhishListService);


  productsData:WritableSignal<IProduct[]>=signal([]);

  ngOnInit(): void {
    this.productsData = this.productsService.productsData;
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


addProductToWhishList(id:string):void{
  this.whishListService.addProductToWhishlist(id).subscribe({
    next:(res)=>{
      console.log(res.data.length);
      if(res.status=='success'){
        this.toastrService.success(res.message);
        this.whishListService.whishlistNumbers.next(res.data.length);

      }

    }
  })
}

}
