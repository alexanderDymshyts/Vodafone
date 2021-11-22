import { Activity } from ".";

export class Ticket {
    woNum: number | undefined;
    woStatusText: string | undefined;
    cancelable: boolean = false;
    reopenable: boolean = false;
    creationDate: Date | undefined;
    activities: Activity [] = [];
}