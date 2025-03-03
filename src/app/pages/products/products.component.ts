import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { ProductCartComponent } from "../../shared/bussines/product-cart/product-cart.component";

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, ProductCartComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  private readonly productsService= inject(ProductsService);
  productsData:WritableSignal<IProduct[]>=signal([]);

  ngOnInit(): void {
    this.productsData = this.productsService.productsData;
  }

}
