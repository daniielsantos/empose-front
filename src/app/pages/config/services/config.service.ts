import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'app/shared/models/client.model';
import { Configs } from 'app/shared/models/configs.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }
  
  find(): Observable<Configs> {
    return this.httpClient.get<Configs>(`${this.apiUrl}/configs`)
  }

  save(config: Configs): Observable<Configs> {
    return this.httpClient.post<Configs>(`${this.apiUrl}/configs`, config)
  }

  update(config: Configs): Observable<Configs> {
    return this.httpClient.put<Configs>(`${this.apiUrl}/configs`, config)
  }

  delete(config: Configs): Observable<Configs> {
    return this.httpClient.delete<Configs>(`${this.apiUrl}/configs`, { body: config })
  }
}
