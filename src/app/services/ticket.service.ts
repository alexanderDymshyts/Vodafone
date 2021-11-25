import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { RequestService } from ".";
import { Ticket } from "../models";

@Injectable({
    providedIn: 'root'
})
export class TicketService{
    constructor(private readonly requestService: RequestService){}

    public getTicket$(ticketId: string): Observable<Ticket | null>{
        return this.requestService.sendGetRequest$(`tickets/${ticketId}`).pipe(
            map(response => response as Ticket)
        );
    }

    public reopenTicket$(ticketId: string, body: any): Observable<boolean> {
        return this.requestService.sendPatchRequest$(`tickets/reopen/`, ticketId.toString(), body).pipe(
            map(response => response as boolean)
        );
    }

    public cancelTicket$(ticketId: string, body: any): Observable<boolean> {
        return this.requestService.sendPatchRequest$(`tickets/cancel/`, ticketId.toString(), body).pipe(
            map(response => response as boolean)
        );
    }
}