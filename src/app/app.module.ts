import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login';
import { ActivityComponent } from './activity';
import { TrackingComponent } from './tracking';
import { HeaderComponent } from './header';
import { ActivityService, RequestService, TicketService } from './services';
import { TicketComponent } from './ticket/ticket.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationService } from './security';

const SERVICES = [
  RequestService,
  TicketService,
  ActivityService,
  AuthenticationService
  // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  // provider used to create fake backend
  // fakeBackendProvider
];

const COMPONENTS = [
  AppComponent, 
  LoginComponent, 
  ActivityComponent,
  TrackingComponent,
  HeaderComponent,
  TicketComponent,
];

const MODULES = [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  ToastrModule.forRoot(),
];

@NgModule({
  declarations: [
    COMPONENTS,    
  ],
  imports: [
    MODULES
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
