import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }

  getBranda(page: number, limit: number): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands?page=${page}&limit=${limit}`);
  }

}
