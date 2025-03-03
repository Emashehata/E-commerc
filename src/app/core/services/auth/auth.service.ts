import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: WritableSignal<any> = signal(null);
  constructor(private httpClient:HttpClient, private router:Router) {
    // this.restoreUserData();
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
      console.log(this.userData());
    }
  }


  restoreUserData(): void {
    this.saveUserData(); // Load user data on refresh
  }

  logOut():void
  {
    localStorage.removeItem('user token');
    this.userData.set(null);
    this.router.navigate(['/login'])
  }


  verifyToken(){
    return this.httpClient.get(`${environment.baseUrl}/api/v1/auth/verifyToken`)
  }
}
