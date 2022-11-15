import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from 'app/shared/models/order.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }
  
  findAll(): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>(`${this.apiUrl}/order`)
  }
  
}
