import { ICategories } from './../../shared/interfaces/categories/Icategories';
import {  Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsComponent } from "../products/products.component";
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';



@Component({
  selector: 'app-home',
  imports: [ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {


  private readonly categoriesService=inject(CategoriesService);
  private readonly productsService= inject(ProductsService);



  cetegoriesData:WritableSignal<ICategories[]>=signal([]);
  productsData:WritableSignal<IProduct[]>=signal([]);
  ngOnInit(): void {
    this.getCategoriesData();
    this.productsData = this.productsService.productsData;


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
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    }}





  }








