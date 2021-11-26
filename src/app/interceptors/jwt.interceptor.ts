import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../security';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private readonly authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const user = this.authenticationService.userValue;
        if(user !== null){
            const isLoggedIn = user && user.token;
            const isApiUrl = request.url.startsWith(environment.apiUri);
            if (isLoggedIn && isApiUrl) {
                request = request.clone({
                    headers: request.headers.append('Authorization', `Bearer ${user.token}`)                                   
                });                
            }
        }       

        return next.handle(request);
    }
}