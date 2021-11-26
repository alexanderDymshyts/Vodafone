import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, dematerialize, materialize, mergeMap, Observable, of, throwError } from "rxjs";
import { Role } from "../enums";

// array of existing users
let users = [
    {
        id:  1, // should bu guid
        username: 'test@vodafone.de',
        password: 'test1'
    },
    {
        id:  2, // should bu guid
        username: 'test1@vodafone.de',
        password: 'test'
    }
];

// array of existing tickets
let tickets = [
    {
        "woNum": 1234,
        "woStatusText": "In Progress",
        "cancelable": true,
        "reopenable": true,
        "creationDate": "2020-05-23",
        "activities": [
            {
                "activityCode": "RCC",
                "status": "completed",
                "activityStart": {
                    "startDate": "2020-05-25",
                    "startTime": "08:47:00"
                },
                "activityFinish": {
                    "finishDate": "2020-05-25",
                    "finishTime": "08:47:00"
                },
                "customerMessage": "Programming a frontend is nice!"
            },        
            {
                "activityCode": "SM1",
                "status": "active",
                "activityStart": {
                    "startDate": "2020-05-25",  
                    "startTime": "08:47:00"
                },
                "activityFinish": {
                    "finishDate": "2020-05-25",
                    "finishTime": "08:47:00"
                },
                "customerMessage": "But Backend is even nicer!"
            }
        ]
    },
]


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
            const { url, method, headers, body } = request;
    
            // wrap in delayed observable to simulate server api call
            return of(null)
                .pipe(mergeMap(handleRoute))
                .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
                .pipe(delay(500))
                .pipe(dematerialize());
    
            function handleRoute() {
                switch (true) {
                    case url.match(/\/tickets\/\d+$/) && method === 'GET':
                        return getTicket();
                    case url.match(/\/tickets\/reopen\/\/\d+$/) && method === 'PATCH':
                        return ok(true);
                    case url.match(/\/tickets\/cancel\/\/\d+$/) && method === 'PATCH':
                        return ok(false);
                    case url.endsWith('/auth/login') && method === 'POST':
                        return authenticate();  
                    default:
                        // pass through any requests not handled above
                        return next.handle(request);
                }    
            }

            function getTicket(){
                
                if(!isLoggedIn())
                    return unauthorized();

                const ticket = tickets.find(x => x.woNum === idFromUrl());
                if(ticket)
                    return ok(ticket);

                return ok(undefined);                
            }            
    
            // route functions
            function authenticate() {
                const { username, password } = JSON.parse(body);
                const user = users.find(x => x.username === username && x.password === password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    role: Role.User,
                    token: generateJwtToken()
                })
            }    
           
            // helper functions

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
    
            function ok(body: any) {
                return of(new HttpResponse({ status: 200, body }))
            }
    
            function error(message: any) {
                const err = { status: 500, error: { message: message}};
                
                return throwError(()=>err);
            }
    
            function unauthorized() {
                const err = { status: 401, error: { message: 'Unauthorised'}};
                return throwError(()=> err);
            }   
    
            function isLoggedIn() {
                // check if jwt token is in auth header
                const authHeader = headers.get('Authorization');
                
                if (!authHeader?.startsWith('Bearer fake-jwt-token')) 
                    return false;
    
                // check if token is expired
                const jwtToken = JSON.parse(atob(authHeader.split('.')[1]));
                const tokenExpired = Date.now() > (jwtToken.exp * 1000);
                if (tokenExpired) 
                    return false;
        
                return true;                
            }
    
            function generateJwtToken() {
                // create token that expires in 15 minutes
                const tokenPayload = { exp: Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000) }
                return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
            }
        }
}