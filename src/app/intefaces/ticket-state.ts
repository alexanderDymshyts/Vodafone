import { ITicket } from ".";
import { Activity } from "../models";

export interface ITicketState{
    ticket: ITicket,
    activitiesCount: number,
    activities: Activity[],
}