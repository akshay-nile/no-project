import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getAlphabets(): Observable<string[]> {
    let alphabets: string[] = [];
    for (let c = "A"; c <= "Z"; c = String.fromCharCode(c.charCodeAt(0) + 1)) {
      alphabets.push(c);
    }
    return of(alphabets);
  }
}


