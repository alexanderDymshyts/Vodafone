import { ActivityFinish, ActivityStart } from ".";
import { Status } from "../enums";

export class Activity {
    activityCode: string | undefined;
    status: Status | undefined;
    activityStart: ActivityStart | undefined;
    activityFinish: ActivityFinish | undefined;
    customerMessage: string | undefined;
}