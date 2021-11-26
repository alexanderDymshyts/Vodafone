import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../security';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginError: string | undefined;
  
  constructor(private fb: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly toaster: ToastrService) { 
    // redirect to home if already logged in
    if (this.authenticationService.userValue) { 
      this.router.navigate(['/']);
    }
  }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get emailField(): any {
    return this.loginForm.get('email');
  }

  get passwordField(): any {
    return this.loginForm.get('password');
  }

  public onSubmit(): void {
    
    // stop here if form is invalid
    if (this.loginForm.invalid) 
     return;   
    
     this.authenticationService.login$(this.emailField.value, this.passwordField.value)
        .subscribe({
            next: () => {
                // get return url from query parameters or default to home page
                this.router.navigateByUrl('/');
            },
            error: error => {
              this.passwordField.value = '';              
              this.toaster.error(error, 'Vodafone 4 life');
              this.toaster.info('Valid credentials: 1) email: test@vodafone.de, password: test1 2) email: test1@vodafone.de, password: test ','Vodafone is great!');
            }
        });
  }
}
