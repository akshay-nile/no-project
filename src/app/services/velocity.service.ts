import { Injectable } from '@angular/core';
import { Group } from '../models/Group';
import { Interviwer } from '../models/Interviewer';

@Injectable({
  providedIn: 'root'
})
export class VelocityService {

  constructor() { }

  getGroups(): Group[] {
    const groups: Group[] = [
      { name: "M1", isWorking: false, students: [] },
      { name: "M2", isWorking: true, students: [] },
      { name: "M3", isWorking: false, students: [] },
      { name: "M4", isWorking: true, students: [] },
      { name: "M5", isWorking: false, students: [] },
      { name: "M6", isWorking: false, students: [] },
      { name: "M7", isWorking: false, students: [] },
      { name: "M8", isWorking: true, students: [] },
      { name: "M9", isWorking: true, students: [] },
      { name: "M10", isWorking: false, students: [] },
      { name: "M11", isWorking: true, students: [] },
      { name: "M12", isWorking: false, students: [] },
    ];
    groups.sort((g1, g2) => (g1.isWorking && !g2.isWorking) ? 1 : (!g1.isWorking && g2.isWorking) ? -1 : 0);
    return groups;
  }

  getInterviewers(): Interviwer[] {
    const interviwers: Interviwer[] = [
      {
        name: "Akshay", 
        group1: new Date(Date.parse('2022-10-08T07:00:00')), 
        group2: new Date(Date.parse('2022-10-09T15:00:00'))
      },
      {
        name: "Madhuri", 
        group1: new Date(Date.parse('2022-10-08T08:00:00')), 
        group2: new Date(Date.parse('2022-10-08T12:00:00'))
      },
      {
        name: "Sandip", 
        group1: new Date(Date.parse('2022-10-09T08:00:00')), 
        group2: new Date(Date.parse('2022-10-09T14:00:00'))
      },
      {
        name: "Pranita", 
        group1: new Date(Date.parse('2022-10-08T12:00:00')), 
        group2: new Date(Date.parse('2022-10-08T16:00:00'))
      },
      {
        name: "Sagar", 
        group1: new Date(Date.parse('2022-10-08T12:30:00')), 
        group2: new Date(Date.parse('2022-10-09T09:00:00'))
      },
      {
        name: "Krushna", 
        group1: new Date(Date.parse('2022-10-08T08:00:00')), 
        group2: new Date(Date.parse('2022-10-09T14:00:00'))
      },
    ];
    return interviwers;
  }
}
