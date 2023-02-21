import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getTranscription(blob: Blob, configs: any): Observable<string> {
    const params = new HttpParams({
      fromObject: {
        emailId: configs.userId,
        language: configs.language,
      }
    });
    return this.http.post<string>(configs.transcriptor, blob,
      { params, responseType: 'text' as 'json' });
  }
}


