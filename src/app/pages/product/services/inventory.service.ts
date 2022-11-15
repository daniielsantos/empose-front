import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from 'app/shared/models/inventory.model';
import { Sku } from 'app/shared/models/sku.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }
  
  findAll(): Observable<Inventory[]> {
    return this.httpClient.get<Inventory[]>(`${this.apiUrl}/sku-inventory`)
  }

  update(inventory: Inventory): Observable<Inventory> {
    return this.httpClient.put<Inventory>(`${this.apiUrl}/sku-inventory`, inventory)
  }

}
