import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: WritableSignal<any> = signal(null);
  userID: WritableSignal<string | null> = signal(null);
  constructor(private httpClient:HttpClient, private router:Router ,@Inject(PLATFORM_ID) id:object ) {
    if(isPlatformBrowser(id)){
          if(localStorage.getItem('user token') !==null){
            this.verifyToken().subscribe({
              next:()=>{
                this.restoreUserData();
              },
              error:()=>{
                this.logOut();
              }
            })
    }
    }

  }

  sendRegisterForm(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }
  sendLoginForm(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }


  saveUserData(): void {
    const token = localStorage.getItem('user token');

    if (token !== null) {
      this.userData.set(jwtDecode(token)); // Use .set() to update the signal
      console.log('user data',this.userData().id);
      this.userID.set(this.userData().id || null);
    }
  }


  restoreUserData(): void {
    this.saveUserData(); // Load user data on refresh
  }

  logOut():void
  {
    localStorage.removeItem('user token');
    this.userData.set(null);
    this.userID.set(null);
    this.router.navigate(['/login'])
  }


  verifyToken():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/auth/verifyToken`)
  }


  forgetPassword(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }


  verifyCode(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }

  updatePassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data);
  }
}
