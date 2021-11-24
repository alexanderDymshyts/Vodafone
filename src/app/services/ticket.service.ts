import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { RequestService } from ".";
import { Ticket } from "../models";

@Injectable()
export class TicketService{
    constructor(private readonly requestService: RequestService){}

    public getTicket$(ticketId: number): Observable<Ticket>{
        return this.requestService.getTicketsRequest$(ticketId.toString()).pipe(
            map(response => response as Ticket)
        );
    }

    public reopenTicket$(ticketId: number): Observable<boolean> {
        console.log(ticketId);
        return this.requestService.reopenTicketRequest$(ticketId.toString()).pipe(
            map(response => response.result as boolean)
        );
    }

    public cancelTicket$(ticketId: number): Observable<boolean> {
        console.log(ticketId);
        return this.requestService.cancelTicketRequest$(ticketId.toString()).pipe(
            map(response => response.result as boolean)
        );
    }
}