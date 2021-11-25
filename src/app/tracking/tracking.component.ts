import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from '../models';
import { TicketService } from '../services';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {  
  ticket: Ticket | undefined;;

  searchForm!: FormGroup;
  
  constructor(private fb: FormBuilder,
    private readonly ticketService: TicketService,
    private readonly toaster: ToastrService,) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]],
    });
  }

  get searchField(): any {
    return this.searchForm.get('search');
  }  

  public onSubmit(): void {    
    // stop here if form is invalid
    if (this.searchForm.invalid) 
     return;  

    this.ticketService.getTicket$(this.searchField.value).subscribe(x=> {
      if(x === null)
        this.invalidTicketId();
      else
        this.validTicketId(x);
    });
  }

  private validTicketId(ticket: Ticket | undefined) {     
    this.ticket = ticket;
    this.toaster.success('We got it :). Scroll down to see result!', 'Vodafone 4 life');
  }

  private invalidTicketId() {
    this.toaster.error('Oh no, ticket not found :(. Please try again!', 'Vodafone 4 life');
  }
}
