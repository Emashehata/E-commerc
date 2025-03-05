import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhishListService {
  whishlistNumbers:BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private httpClient:HttpClient) { }

    addProductToWhishlist(id:string|null):Observable<any>{
      return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
        "productId": id
      })
    }

    getLoggedUserWhishlist():Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
    }

    removeSpecificwhishlistItem(id:string):Observable<any>{
      return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`);
    }
}
