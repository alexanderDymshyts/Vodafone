import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RequestService{

    constructor(private readonly http: HttpClient) {} 

    public sendGetRequest$(path: string):Observable<any>{
        return this.http.get(`${environment.apiUri + path}`, 
        {
             headers: {
            'Content-Type': 'application/json'
            }, 
            responseType: 'json'
        });
    }

    public sendPostRequest$(path: string, body: any): Observable<any> {
        return this.http.post(`${environment.apiUri + path}`, JSON.stringify(body), 
        { 
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json'
        });
    }   

    public sendPatchRequest$(path: string, id: string, body: any): Observable<any>{
        return this.http.patch(`${environment.apiUri + path}/${id}`, JSON.stringify(body),
        {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json'
        });
    }
}