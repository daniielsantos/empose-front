import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/shared/models/users.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  userLogin(user: Users): Observable<Users[]> {
    return this.httpClient.post<Users[]>(`${this.apiUrl}/users-login`, user)
  }

  save(user: Users): Observable<Users> {
    return this.httpClient.post<Users>(`${this.apiUrl}/users`, user)
  }

}
