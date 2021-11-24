import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Activity } from '../models';
import { ActivityService } from '../services';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']

})
export class ActivityComponent implements OnInit {

  activity$: Observable<Activity | undefined> | undefined;

  constructor(private readonly route: ActivatedRoute,
    private readonly activityService: ActivityService) { }

  ngOnInit(): void {    
    this.route.params.subscribe((params: Params) => {
      const activityId = params['activityId']; 
      this.activity$ = this.activityService.getActivity$(activityId);      
    });
  }
}
