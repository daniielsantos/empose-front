import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'app/shared/models/client.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl: string = `${environment.apiUrl}`;
  
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
    return this.httpClient.put<Client>(`${this.apiUrl}/client`, client)
  }

  delete(client: Client): Observable<Client> {
    return this.httpClient.delete<Client>(`${this.apiUrl}/client`, { body: client })
  }

}
