import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
        private readonly formBuilder= inject(FormBuilder);
        private readonly authService=inject(AuthService);
        private readonly router=inject(Router);
        private readonly toastrService=inject(ToastrService);
        showPassword:boolean = false;
        showRePassword: boolean = false;
        isLoading:boolean=false;


        loginForm!:FormGroup;

        ngOnInit(): void {
          this.loginForm = this.formBuilder.group({
            email:[null,[Validators.required,Validators.email]],
            password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
          }
        )
        }



        sumbitLoginForm():void{
          if(this.loginForm.valid){
            this.isLoading=true;
            this.authService.sendLoginForm(this.loginForm.value).pipe(finalize(() => this.isLoading = false)).subscribe({
              next: (res) => {
                console.log(res);
                if(res.message === 'success' ){
                  this.toastrService.success('Welcome back to your Account !');
                  setTimeout(() => {
                    localStorage.setItem('user token',res.token);
                    this.authService.saveUserData();
                    this.router.navigate(['/home']);
                  }, 500);

                }
                this.isLoading=false;
              }
            })
          }
          else{
            this.loginForm.markAllAsTouched();
          }

        }

        togglePassword() {
          this.showPassword = !this.showPassword;
        }
}
