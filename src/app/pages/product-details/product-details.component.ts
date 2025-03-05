import { IProduct } from './../../shared/interfaces/iproduct';
import { Component, inject, WritableSignal, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsComponent {
      private readonly activatedRoute=inject(ActivatedRoute);
      private readonly productsService=inject(ProductsService);
      private readonly cartService=inject(CartService);
      private readonly toastrService=inject(ToastrService);


      deatilsProduct: WritableSignal<IProduct | null> = signal(null);
      productsData:WritableSignal<IProduct[]>=signal([]);
      selectedImage = signal('');

      ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe({
          next:(params)=>{
              let idProduct = params.get('id');
              this.productsService.getSpecficProduct(idProduct).subscribe({
                  next:(res)=>{
                    console.log(res.data.images);
                    this.deatilsProduct.set(res.data);
                    this.selectedImage.set(res.data.imageCover);
                    console.log(this.deatilsProduct());


                  }
              })
          }
        })

        this.productsData = this.productsService.productsData;
        console.log(this.productsData());


      }

      onSlideChange(event: any) {
        // Update selected image when sliding the main Swiper
        const activeIndex = event.activeIndex;
        const images = this.deatilsProduct()?.images;
        if (images && images[activeIndex]) {
          this.selectedImage.set(images[activeIndex]);
        }
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
}
