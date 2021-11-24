import { Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ITicket, ITicketState } from '../intefaces';
import { TicketService } from '../services/ticket.service';
import { ToastrService } from 'ngx-toastr';
import { Status } from '../enums';
import { Router } from '@angular/router';
import { Activity } from '../models';
import { ActivityService } from '../services';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [RxState]
})
export class TicketComponent implements OnInit {

  ticket$ = this.state.select('ticket');
  activitiesCount$ = this.state.select('activitiesCount');
  activities$ = this.state.select('activities');

  constructor(private readonly ticketService: TicketService,
    private readonly state: RxState<ITicketState>,
    private readonly toaster: ToastrService,
    private readonly router: Router,
    private readonly activityService: ActivityService) { }

  ngOnInit(): void {
     this.ticketService.getTicket$(123).subscribe(x => {
       const ticket: ITicket = {
        woNum: x.woNum ?? 0,
        woStatusText: x.woStatusText ?? '',
        cancelable: x.cancelable,
        reopenable: x.reopenable,
        creationDate: x.creationDate ?? new Date(),
       };

       this.activityService.addActivities(x.activities);       

       this.state.set(
       { 
           activitiesCount: x.activities.length,
           activities: x.activities,
           ticket : ticket,
       });
     });
  }

  viewActivity(activity: Activity){    
    this.router.navigate(['/activity', activity.activityCode]);
  }

  reopenTicket(){
      this.ticketService.reopenTicket$(this.state.get('ticket').woNum).subscribe(
        x => this.showToaster(x))
  }

  cancelTicket() {
    this.ticketService.cancelTicket$(this.state.get('ticket').woNum).subscribe(
      x => this.showToaster(x))
  }

  showToaster(result: boolean){
    if(result){
      this.successToaster();
      }else{
        this.errorToaster();
      }
  }


  successToaster(): void {
    this.toaster.success('We made it :)', 'Vodafone 4 life');
  }

  errorToaster(): void {
    this.toaster.error('Oh no, some went wrong :(', 'Vodafone 4 life');
  }

  stepCounter(i: number) {    
    i = i - 1;
    return new Array(i);
  }

  isCompleted(status: Status | undefined){
    return status === Status.Completed;
  }

  isInProgress(status: Status | undefined){
    return status === Status.InProgress;
  }
}
