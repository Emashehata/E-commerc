import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClinet:HttpClient) { }

  getAllCategories():Observable<any>{
    return this.httpClinet.get(`${environment.baseUrl}/api/v1/categories`);
  }
}
