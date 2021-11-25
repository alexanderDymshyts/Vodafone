import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RequestService } from "../services";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService{

    constructor(
        private readonly router: Router,
        private readonly requestService: RequestService
    ){}

    public logout(){
        this.router.navigate(['']);
    }
}