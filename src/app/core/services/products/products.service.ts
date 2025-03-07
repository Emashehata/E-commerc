import { Injectable, WritableSignal, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsData: WritableSignal<IProduct[]> = signal([]); // Store product data
  totalPages: WritableSignal<number> = signal(1);
  currentPage: WritableSignal<number> = signal(1);
  productsAllData: WritableSignal<IProduct[]> = signal([]);

  constructor(private httpClient: HttpClient) {
    this.fetchProducts(); // Automatically fetch data when service is created
  }

  private fetchProducts(): void {
    this.httpClient
      .get<{ data: IProduct[] }>(`${environment.baseUrl}/api/v1/products`)
      .subscribe({
        next: (res) => {
          this.productsData.set(res.data)
        console.log(res)
        ;
        }
      });
  }

  fetchAllProducts(page: number = 1, limit: number = 8): void {
    this.httpClient
      .get<{ data: IProduct[], metadata: { numberOfPages: number } }>(
        `${environment.baseUrl}/api/v1/products?page=${page}&limit=${limit}`
      )
      .subscribe({
        next: (res) => {
          this.productsData.set(res.data);
          this.totalPages.set(res.metadata.numberOfPages);
          this.currentPage.set(page);
        }
      });
  }


  getSpecficProduct(id:string | null):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}

