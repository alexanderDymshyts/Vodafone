import { Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ITicket, ITicketState } from '../intefaces';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [TicketService, RxState]
})
export class TicketComponent implements OnInit {

  ticket$ = this.state.select('ticket');
  activitiesCount$ = this.state.select('activitiesCount');
  activities$ = this.state.select('activities');

  constructor(private readonly ticketService: TicketService,
    private readonly state: RxState<ITicketState>) { }

  ngOnInit(): void {
     this.ticketService.getTicket$(123).subscribe(x => {
       const ticket: ITicket = {
        woNum: x.woNum ?? 0,
        woStatusText: x.woStatusText ?? '',
        cancelable: x.cancelable,
        reopenable: x.reopenable,
        creationDate: x.creationDate ?? new Date(),
       };
       this.state.set(
       { 
           activitiesCount: x.activities.length,
           activities: x.activities,
           ticket : ticket,
       });
     });
  }

  viewActivity(){
    console.log('Btn clicked');
  }

  reopenTicket(){
      this.ticketService.reopenTicket$(this.state.get('ticket').woNum).subscribe(
        x => {
          console.log(x);
        }
      )
  }

  cancelTicket() {
    this.ticketService.cancelTicket$(this.state.get('ticket').woNum).subscribe(
      x => {
        console.log(x);
      }
    )
  }

  stepCounter(i: number) {    
    i = i - 1;
    return new Array(i);
  }
}
