import { ICategories } from './../../shared/interfaces/categories/Icategories';
import {  Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsComponent } from "../products/products.component";
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishListService } from '../../core/services/whish-list.service';



@Component({
  selector: 'app-home',
  imports: [ProductsComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {


  private readonly categoriesService=inject(CategoriesService);
  private readonly productsService= inject(ProductsService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  private readonly whishListService=inject(WhishListService);

  cetegoriesData:WritableSignal<ICategories[]>=signal([]);
  productsData:WritableSignal<IProduct[]>=signal([]);
  ngOnInit(): void {
    this.getCategoriesData();
    this.productsData = this.productsService.productsData;
    // console.log(this.productsData());



  }
  getCategoriesData():void{

    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.cetegoriesData.set(res.data);

      }

    })
  }


  breakpoints =
  {
    640: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 10,
    }}


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
            console.log(res);
            if(res.status=='success'){
              this.toastrService.success(res.message);
              this.whishListService.whishlistNumbers.next(res.data.length);
            }

          }
        })
    }


  }








