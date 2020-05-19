import TaskVolunteer from "@/models/TaskVolunteer";

export default class TasksVolunteerResponse {
    constructor(state: Boolean, responseCode: Number, arr: Array<TaskVolunteer> | null){
        this.state = state;
        this.responseCode = responseCode;
        if(arr) 
            this.taskArray = arr;
    }
  
    readonly state: Boolean;
    readonly responseCode: Number;
    readonly taskArray: Array<TaskVolunteer>;
  };