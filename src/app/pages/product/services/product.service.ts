import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }
  
  findAll(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiUrl}/product`)
  }

  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiUrl}/product`, product)
  }

}
