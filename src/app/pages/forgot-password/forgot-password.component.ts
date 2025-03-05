import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
            private readonly formBuilder= inject(FormBuilder);
            private readonly authService=inject(AuthService);
            private readonly router=inject(Router);
            private readonly toastrService=inject(ToastrService);
            showPassword:boolean = false;
            showRePassword: boolean = false;
            isLoading:boolean=false;
            step:number = 1;


            forgetPasswordForm!:FormGroup;
            verifyCodeForm!:FormGroup;
            createNewPassword! :FormGroup;

            ngOnInit(): void {

              /**********email********* */
              this.forgetPasswordForm = this.formBuilder.group({
                email:[null,[Validators.required,Validators.email]],
                // password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
              }
            )

            /************code************ */
            this.verifyCodeForm = this.formBuilder.group({
              resetCode:[null ,[Validators.required,Validators.pattern(/^[0-9]{5,}$/)]]
            }
          )



          /*****************new password******************* */
          this.createNewPassword = this.formBuilder.group({
            email:[null,[Validators.required,Validators.email]],
            newPassword:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
          }
        )

            }



            sumbitForgetPasswordForm():void{
              if(this.forgetPasswordForm.valid){
                this.isLoading=true;
                let emailValue =  this.forgetPasswordForm.get('email')?.value;
                this.createNewPassword.get('email')?.patchValue(emailValue);
                this.authService.forgetPassword(this.forgetPasswordForm.value).pipe(finalize(() => this.isLoading = false)).subscribe({
                  next: (res) => {
                    console.log(res);
                    if(res.statusMsg === 'success' ){
                      this.toastrService.success(res.message);
                      this.step = 2;
                    }
                    this.isLoading=false;
                  }
                })
              }
              else{
                this.forgetPasswordForm.markAllAsTouched();
              }

            }



            sumbitVerifyCodeForm():void{
              if(this.verifyCodeForm.valid){
                this.isLoading=true;
                this.authService.verifyCode(this.verifyCodeForm.value).pipe(finalize(() => this.isLoading = false)).subscribe({
                  next: (res) => {
                    console.log(res);
                    if(res.status === 'Success'){
                      this.toastrService.success(res.status);
                      this.step = 3;
                    }
                    this.isLoading=false;
                  }
                })
              }
              else{
                this.verifyCodeForm.markAllAsTouched();
              }

            }



            sumbitCreatNewPasswordForm():void{
              if(this.createNewPassword.valid){
                this.isLoading=true;
                this.authService.updatePassword(this.createNewPassword.value).pipe(finalize(() => this.isLoading = false)).subscribe({
                  next: (res) => {
                    console.log(res);

                      this.toastrService.success('Password is updated successfully');
                      localStorage.setItem('user token',res.token);
                      this.authService.saveUserData();
                      this.router.navigate(['/home'])

                      this.isLoading=false;
                  }
                })
              }
              else{
                this.createNewPassword.markAllAsTouched();
              }

            }

            togglePassword() {
              this.showPassword = !this.showPassword;
            }
}
