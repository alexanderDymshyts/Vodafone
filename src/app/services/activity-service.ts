import { Injectable } from "@angular/core";
import { insert, RxState } from "@rx-angular/state";
import { map, Observable, Subject, tap } from "rxjs";
import { IActivityState } from "../intefaces";
import { Activity } from "../models";

@Injectable({
    providedIn: 'root'
})
export class ActivityService extends RxState<IActivityState>{

    readonly state$ = this.select();
    
    constructor(){super()}

    public addActivities(activitiesToAdd: Activity[]){        
        this.set({'activities': activitiesToAdd});        
    }

    public getActivity$(activityId: string): Observable<Activity | undefined>{
        return this.state$.pipe(
            map(state => state.activities.find(activity => activity.activityCode === activityId))
        );  
    }
}