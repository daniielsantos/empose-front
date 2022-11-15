import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'app/shared/models/category.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }
  
  findAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/category`)
  }

  save(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${this.apiUrl}/category`, category)
  }

  update(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${this.apiUrl}/category`, category)
  }
  
  delete(category: Category): Observable<any> {
    return this.httpClient.delete<Category>(`${this.apiUrl}/category`, { body: category })
  }

}
