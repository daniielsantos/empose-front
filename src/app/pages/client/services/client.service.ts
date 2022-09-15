import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';
import { Order } from 'src/app/shared/models/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl: string = `${environment.apiServer}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }
  
  findAll(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.apiUrl}/client`)
  }

  save(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(`${this.apiUrl}/client`, client)
  }

  update(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(`${this.apiUrl}/client`, client)
  }

}
