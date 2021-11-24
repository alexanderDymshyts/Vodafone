import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './activity';
import { LoginComponent } from './login';
import { TrackingComponent } from './tracking';

const routes: Routes = [
  //{ path: '', component: TrackingComponent, canActivate: [AuthGuard] },  
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'tracking', component: TrackingComponent},
  { path: 'activity', component: ActivityComponent},

  // otherwise redirect to tracking
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
