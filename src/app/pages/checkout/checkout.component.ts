import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../../core/services/orders.service';


@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
              private readonly formBuilder= inject(FormBuilder);
              private readonly cartService=inject(CartService);
              private activatedRoute=inject(ActivatedRoute);
              private readonly ordersService=inject(OrdersService)
              cartData: WritableSignal<Data | null> = signal(null);
              private readonly router=inject(Router);
              private readonly toastrService=inject(ToastrService);

              isLoading:boolean=false;
              cartId!:string;
              selectedPaymentMethod: 'cash' | 'online' = 'cash'; // Default: Cash

              checkoutForm!:FormGroup;

              ngOnInit(): void {
                this.checkoutForm = this.formBuilder.group({
                  details:[null,[Validators.required]],
                  phone:[null,[Validators.required,Validators.pattern(/^(?:\+20|0)1[0-25]\d{8}$/)]],
                  city:[null,[Validators.required]],


                }
              )

              this.getUserCart();
              this.getCardId();
              }






              sumbitOrderOnline():void{
                this.ordersService.onlinePayment(this.cartId,this.checkoutForm.value).subscribe({
                  next:(res)=>{
                    console.log(res);
                    if(res.status==='success'){
                      open(res.session.url,'_self');
                    }
                  }
                })
              }
              sumbitOrderCash():void{
                this.ordersService.cashPayment(this.cartId,this.checkoutForm.value).subscribe({
                  next:(res)=>{
                    if(res.status==='success'){
                        this.toastrService.success('Your order is out for delivery and is currently in your area.');
                        this.router.navigate(['/allorders']);
                    }

                  }
                })
              }


              submitOrder(): void {
                if (this.checkoutForm.invalid) {
                  this.checkoutForm.markAllAsTouched();
                  return;
                }

                if (this.selectedPaymentMethod === 'online') {
                  this.sumbitOrderOnline();
                } else {
                  this.sumbitOrderCash();
                }
              }


              getCardId():void{
                this.activatedRoute.paramMap.subscribe({
                  next:(param)=>{
                      this.cartId = param.get('id')!;
                  }
                })
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


}
