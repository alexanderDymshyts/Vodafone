import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { RequestService } from ".";
import { Ticket } from "../models";

@Injectable({
    providedIn: 'root'
})
export class TicketService{
    constructor(private readonly requestService: RequestService){}

    public getTicket$(ticketId: number): Observable<Ticket | null>{
        return this.requestService.getTicketByIdRequest$(ticketId).pipe(
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
        return this.requestService.cancelTicketRequest$(ticketId.toString()).pipe(
            map(response => response.result as boolean)
        );
    }
}