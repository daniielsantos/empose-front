import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Uploads } from 'src/app/shared/models/uploads.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<Uploads[]> {
    return this.httpClient.get<Uploads[]>(`${this.apiUrl}/uploads`)
  }

  save(data: any): Observable<any> {  
    // let headers = new HttpHeaders().set('content-type', 'multipart/form-data')
    return this.httpClient.post<any[]>(`${this.apiUrl}/fileUpload`, data)
  }

  update(upload: Uploads): Observable<Uploads> {
    return this.httpClient.put<Uploads>(`${this.apiUrl}/uploads`, upload)
  }

  delete(upload: Uploads): Observable<Uploads> {
    return this.httpClient.delete<Uploads>(`${this.apiUrl}/uploads`, { body: upload })
  }
}
