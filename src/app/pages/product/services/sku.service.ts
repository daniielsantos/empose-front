import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sku } from 'src/app/shared/models/sku.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkuService {

  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }
  
  findAll(): Observable<Sku[]> {
    return this.httpClient.get<Sku[]>(`${this.apiUrl}/sku`)
  }

  save(sku: Sku): Observable<Sku> {
    return this.httpClient.post<Sku>(`${this.apiUrl}/sku`, sku)
  }

  update(sku: Sku): Observable<Sku> {
    return this.httpClient.put<Sku>(`${this.apiUrl}/sku`, sku)
  }
}
