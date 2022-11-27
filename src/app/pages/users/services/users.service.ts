import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from 'app/shared/models/users.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }
  
  findAll(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(`${this.apiUrl}/users`)
  }

  save(users: Users): Observable<Users> {
    return this.httpClient.post<Users>(`${this.apiUrl}/users`, users)
  }

  update(users: Users): Observable<Users> {
    return this.httpClient.put<Users>(`${this.apiUrl}/users`, users)
  }

  delete(users: Users): Observable<Users> {
    return this.httpClient.delete<Users>(`${this.apiUrl}/users`, { body: users })
  }
}
