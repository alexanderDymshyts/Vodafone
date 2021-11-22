import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  
  constructor(private fb: FormBuilder) { }

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

    //this.invalidTicketId();
    this.validTicketId();
   
  }

  private validTicketId() {
    this.isTicketFound = true;
  }

  private invalidTicketId() {
    this.ticketId = this.searchField.value;
    this.searchForm.setValue({search: ''});
    this.isTicketFound = false;
    this.isTicketNotFound = true;
  }
}
