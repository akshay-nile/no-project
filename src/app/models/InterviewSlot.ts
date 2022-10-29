import { Group } from "./Group";

export interface InterviewSlot {
    interviewerName: string;
    dateAndTime: Date;
    link: string;
    group: Group | null;
}