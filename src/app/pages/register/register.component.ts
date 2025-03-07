import { Component, inject, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
    private readonly formBuilder= inject(FormBuilder);
    private readonly authService=inject(AuthService);
    private readonly router=inject(Router);
    private readonly toastrService=inject(ToastrService);
    showPassword:boolean = false;
    showRePassword: boolean = false;
    isLoading:boolean=false;


    registerForm!:FormGroup;

    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        name: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
        email:[null,[Validators.required,Validators.email]],
        password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
        rePassword:[null,[Validators.required]],
        phone:[null,[Validators.required,Validators.pattern(/^(?:\+20|0)1[0-25]\d{8}$/)]],
      },
       {
        validators :
          [this.passwordMatchValidator]

       }
    )
    }

    passwordMatchValidator(formGroup: AbstractControl) {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('rePassword')?.value;

      // If the password field has a value but rePassword is empty, still trigger validation
      if (password && !confirmPassword) {
        formGroup.get('rePassword')?.setErrors({ required: true });
        return null;
      }

      // If passwords do not match, set mismatch error
      if (password !== confirmPassword) {
        formGroup.get('rePassword')?.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        formGroup.get('rePassword')?.setErrors(null);
        return null;
      }
    }


    sumbitRegisterForm():void{
      if(this.registerForm.valid){
        this.isLoading=true;
        this.authService.sendRegisterForm(this.registerForm.value).pipe(finalize(() => this.isLoading = false)).subscribe({
          next: (res) => {
            console.log(res);
            if(res.message === 'success' ){
              this.toastrService.success('Account was created successfully');
              setTimeout(() => {
                // localStorage.setItem('user token',res.token);
                this.authService.saveUserData();
                this.router.navigate(['./login']);
              }, 500);

            }
            this.isLoading=false;
          }
        })
      }
      else{
        this.registerForm.markAllAsTouched();
      }

    }

    togglePassword() {
      this.showPassword = !this.showPassword;
    }

    toggleRePassword() {
      this.showRePassword = !this.showRePassword;
    }

}
