import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  readonly states = new Map<string, any>();

  constructor() { }
}
