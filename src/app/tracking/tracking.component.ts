import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../services';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  
  isTicketFound: boolean | undefined;
  isTicketNotFound: boolean | undefined;
  ticketId: string | undefined;

  searchForm!: FormGroup;
  
  constructor(private fb: FormBuilder,
    private readonly ticketService: TicketService) { }

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

    const val = Number(this.searchField.value);

    this.ticketService.getTicket$(val).subscribe(x=> {
      console.log(x);
      if(x === null)
        this.invalidTicketId();
      else
        this.validTicketId();
    });
  }

  private validTicketId() {
    console.log('id is valied');
    this.isTicketFound = true;
    this.isTicketNotFound = false;
    this.ticketId = undefined;
  }

  private invalidTicketId() {
    this.ticketId = this.searchField.value;
    this.searchForm.setValue({search: ''});
    this.isTicketFound = false;
    this.isTicketNotFound = true;
  }
}
