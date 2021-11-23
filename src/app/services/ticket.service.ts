import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { RequestService } from ".";
import { Ticket } from "../models";

@Injectable()
export class TicketService{
    constructor(private readonly requestService: RequestService){}

    public getTicket$(ticketId: number): Observable<Ticket>{
        return this.requestService.sendGetRequest$(ticketId.toString()).pipe(
            map(response => response as Ticket)
        );
    }
}