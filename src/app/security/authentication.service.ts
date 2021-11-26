import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RequestService } from "../services/index";
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from "rxjs";
import jwt_decode from 'jwt-decode';
import { IUser } from "../intefaces";

@Injectable({providedIn: 'root'})
export class AuthenticationService{
    
    public userSubject = new ReplaySubject<IUser | undefined>(1);

    constructor(
        private readonly router: Router,
        private readonly baseRequests: RequestService
    ){
        let data = localStorage.getItem('currentUser');
        if(data !== null)
            this.userSubject.next(JSON.parse(data));
    }

    public get userValue(): any {
        let data = localStorage.getItem('currentUser');
        if(data === null)
            return null;

        return JSON.parse(data);
    }

    public login$(username: string, password: string): Observable<boolean> {
        return this.baseRequests.sendPostRequest$(
            'auth/login', 
            { username: username, password: password })
        .pipe(            
            map(response => {
                try {  
                    if( response !== null){
                        let user = {
                            id: response.id,
                            username: username,
                            token: response.token,
                            role: response.role,
                        };
    
                        localStorage.setItem('currentUser', JSON.stringify(user));
    
                        this.userSubject.next(user);   
                        return true;
                    }

                  
                } catch (error) {
                    console.error(error);
                   
                }     
                return false;
            }),
        );
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.userSubject.next(undefined);
        this.router.navigate(['/']);
    }  
}
