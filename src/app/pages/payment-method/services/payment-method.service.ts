import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentMethods } from 'app/shared/models/payment.methods.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private apiUrl: string = `${environment.apiUrl}`;

  constructor(
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<PaymentMethods[]> {
    return this.httpClient.get<PaymentMethods[]>(`${this.apiUrl}/payment-methods`)
  }

  save(payment_method: PaymentMethods): Observable<PaymentMethods> {
    return this.httpClient.post<PaymentMethods>(`${this.apiUrl}/payment-methods`, payment_method)
  }

  update(payment_method: PaymentMethods): Observable<PaymentMethods> {
    return this.httpClient.put<PaymentMethods>(`${this.apiUrl}/payment-methods`, payment_method)
  }

  delete(payment_method: PaymentMethods): Observable<PaymentMethods> {
    return this.httpClient.delete<PaymentMethods>(`${this.apiUrl}/payment-methods`, { body: payment_method })
  }
}
