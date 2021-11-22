import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { TrackingComponent } from './tracking';

const routes: Routes = [
  //{ path: '', component: TrackingComponent, canActivate: [AuthGuard] },  
  { path: '', component: LoginComponent},
  { path: 'tracking', component: TrackingComponent}

  // otherwise redirect to tracking
  //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
