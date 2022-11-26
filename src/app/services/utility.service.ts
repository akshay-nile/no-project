import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private readonly states = new Map<string, any>();

  constructor() { }

  storeState(component: any, properties: string[], uniqueKey: string | null = null): void {
    uniqueKey = (uniqueKey ?? component.constructor.name) as string;
    const state: any = this.states.get(uniqueKey) ?? {};
    properties.forEach(prop => state[prop] = component[prop]);
    this.states.set(uniqueKey, state);
    console.log('store:', uniqueKey, this.states.get(uniqueKey));
  }

  restoreState(component: any, properties: string[], uniqueKey: string | null = null): void {
    uniqueKey = (uniqueKey ?? component.constructor.name) as string;
    const state: any = this.states.get(uniqueKey);
    properties.forEach(prop => component[prop] = state[prop]);
    console.log('restore:', uniqueKey, this.states.get(uniqueKey));
  }

  clearState(component: any, uniqueKey: string | null = null): any {
    uniqueKey = (uniqueKey ?? component.constructor.name) as string;
    console.log('clear:', uniqueKey, this.states.get(uniqueKey));
    this.states.delete(uniqueKey);
  }

  restoreAndClearState(component: any, properties: string[], uniqueKey: string | null = null): void {
    this.restoreState(component, properties, uniqueKey);
    this.clearState(component, uniqueKey);
  }

  stateExists(component: any, uniqueKey: string | null = null): boolean {
    uniqueKey = (uniqueKey ?? component.constructor.name) as string;
    return this.states.has(uniqueKey);
  }

  getProperty(property: string, keySource: any): any {
    let uniqueKey = (typeof keySource) === 'string' ? keySource : keySource.constructor.name;
    return this.states.get(uniqueKey)[property];
  }
}
