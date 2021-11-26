import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './activity';
import { Role } from './enums';
import { LoginComponent } from './login';
import { AuthGuard } from './security';
import { TrackingComponent } from './tracking';

const routes: Routes = [
  { path: '', redirectTo: '/tracking', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'tracking', component: TrackingComponent, canActivate: [AuthGuard], data: {roles: [Role.User, Role.Moderator]}},
  { path: 'activity/:activityId', component: ActivityComponent, canActivate: [AuthGuard], data: {roles: [Role.User, Role.Moderator]}},

  // otherwise redirect to login
  { path: '**', redirectTo: '/tracking' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
