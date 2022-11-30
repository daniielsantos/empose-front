import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailOptions } from 'app/shared/models/email.model';
import { environment } from 'environments/environment';
import { Configs } from 'app/shared/models/configs.model';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {
  private apiUrl: string = `${environment.apiUrl}`;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  sendEmail(options: EmailOptions): Observable<EmailOptions> {
    return this.httpClient.post<EmailOptions>(`${this.apiUrl}/email-sender`, options)
  }

  getConfigs(): Observable<Configs> {
    return this.httpClient.get<Configs>(`${this.apiUrl}/configs`)
  }
  
}
