import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from 'app/shared/models/users.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {

  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  accountRecovery(user: Users): Observable<Users> {
    return this.httpClient.post<Users>(`${this.apiUrl}/recovery`, user)
  }

}
