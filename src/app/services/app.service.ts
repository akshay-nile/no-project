import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getAlphabets(): Observable<string[]> {
    let alphabets: string[] = [];
    for (let c = "A"; c <= "Z"; c = String.fromCharCode(c.charCodeAt(0) + 1)) {
      alphabets.push(c);
    }
    return of(alphabets);
  }

  getTranscription(blob: Blob, userId: string, language: string): Observable<string> {
    const params = new HttpParams({ fromObject: { userId, language } });
    return this.http.post<string>(environment.transcriptionURL, blob,
      { params, responseType: 'text' as 'json' });
  }
}


