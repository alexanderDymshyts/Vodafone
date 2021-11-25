import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Ticket } from "../models";

@Injectable({
    providedIn: 'root'
})
export class RequestService{

    constructor(private readonly http: HttpClient) {}

    public getTicketByIdRequest$(ticketId: number): Observable<Ticket | null> { 
        if(ticketId === 1234)
            return this.http.get<Ticket>('../assets/responces/ticket.json');   
        
        return of(null);
        // return this.http.get(`${environment.apiUri + path}`, 
        // {
        //      headers: {
        //     'Content-Type': 'application/json'
        //     }, 
        //     responseType: 'json'
        // });
    }

    public reopenTicketRequest$(path: string): Observable<any> { 
        return this.http.get<boolean>('../assets/responces/reopen-ticket.json');  
    }

    public cancelTicketRequest$(path: string): Observable<any> { 
        return this.http.get<boolean>('../assets/responces/cancel-ticket.json'); 
    }

    // public sendPostRequest$(path: string, body: any): Observable<any> {
    //     return this.http.post(`${environment.apiUri + path}`, JSON.stringify(body), 
    //     { 
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         responseType: 'json'
    //     });
    // }   
}