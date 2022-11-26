import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private readonly states = new Map<string, any>();

  constructor() { }

  storeState(component: any, properties?: string[], backupKey?: string): void {
    backupKey = backupKey ?? component.backupKey as string;
    properties = properties ?? component.properties as string[];
    const state: any = this.states.get(backupKey) ?? {};
    properties.forEach(prop => state[prop] = component[prop]);
    this.states.set(backupKey, state);
  }

  restoreState(component: any, properties?: string[], backupKey?: string): void {
    backupKey = backupKey ?? component.backupKey as string;
    properties = properties ?? component.properties as string[];
    const state: any = this.states.get(backupKey);
    properties.forEach(prop => component[prop] = state[prop]);
  }

  clearState(component: any, backupKey?: string): any {
    backupKey = backupKey ?? component.backupKey as string;
    this.states.delete(backupKey);
  }

  restoreAndClearState(component: any, properties?: string[], backupKey?: string): void {
    this.restoreState(component, properties, backupKey);
    this.clearState(component, backupKey);
  }

  stateExists(component: any, backupKey?: string): boolean {
    backupKey = backupKey ?? component.backupKey as string;
    return this.states.has(backupKey);
  }

  getProperty(component: any, property: string): any {
    const backupKey = (typeof component) === 'string' ? component : component.backupKey as string;
    return this.states.get(backupKey)[property];
  }
}
