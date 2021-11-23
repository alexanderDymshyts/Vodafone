import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [TicketService]
})
export class TicketComponent implements OnInit {

  constructor(private readonly ticketService: TicketService) { }

  ngOnInit(): void {
     this.ticketService.getTicket$(123).subscribe(x => console.table(x));
  }

}
