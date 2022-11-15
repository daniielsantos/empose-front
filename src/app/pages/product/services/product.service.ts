import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from 'app/shared/models/order.model';
import { Product } from 'app/shared/models/product.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }
  
  findAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/product`)
  }

  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiUrl}/product`, product)
  }

  update(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/product`, product)
  }

  delete(product: Product): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.apiUrl}/product`, { body: product })
  }

}
