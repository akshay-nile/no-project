import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/Group';
import { InterviewSlot } from 'src/app/models/InterviewSlot';
import { VelocityService } from 'src/app/services/velocity.service';

@Component({
  selector: 'app-interview-management',
  templateUrl: './interview-management.component.html',
  styleUrls: ['./interview-management.component.scss']
})
export class InterviewManagementComponent implements OnInit {

  groups: Group[] = [];
  interviewSlots: InterviewSlot[] = [];

  constructor(private velocityService: VelocityService) { }

  ngOnInit(): void {
    this.groups = this.velocityService.getGroups();
    this.populateInterviewSlots();
  }

  populateInterviewSlots(): void {
    const interviewers = this.velocityService.getInterviewers();
    this.interviewSlots = [];
    interviewers.forEach(interviewer => {
      this.interviewSlots.push({
        interviewerName: interviewer.name,
        dateAndTime: interviewer.group1,
        link: interviewer.link as string,
        group: null
      });
      this.interviewSlots.push({
        interviewerName: interviewer.name,
        dateAndTime: interviewer.group2,
        link: interviewer.link as string,
        group: null
      });
    });
    this.interviewSlots.sort((is1, is2) => (is1.dateAndTime < is2.dateAndTime) ? -1 : (is1.dateAndTime > is2.dateAndTime) ? 1 : 0);
  }

  private rotatedArray(arr: InterviewSlot[]): InterviewSlot[] {
    return arr.length > 1 ? [arr[arr.length - 1]].concat(arr.slice(0, arr.length - 1)) : arr;
  }

  rotate(): void {
    const cut = this.groups.filter(g => !g.isWorking).length;
    const nonWorkingSlots = this.rotatedArray(this.interviewSlots.slice(0, cut));
    const workingSlots = this.rotatedArray(this.interviewSlots.slice(cut));
    this.interviewSlots = nonWorkingSlots.concat(workingSlots);
  }

}
