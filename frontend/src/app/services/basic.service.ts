import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";

@Injectable()
export class BasicService {
  constructor(private http: HttpClient) {}

  getEventDefs(): Observable<any> {
    return this.http.get(`/alertSys/getAllEventDefs/`);
  }

  getallTables(): Observable<any> {
    return this.http.get(`/alertSys/getAllTables/`);
  }

  postEventDefs(def: any): Observable<any> {
    return this.http.post(`/alertSys/insertEventDef/`, def);
  }

  postEventAction(action: any): Observable<any> {
    return this.http.post(`/alertSys/insertEventAction/`, action);
  }

  postEventCondition(condition: any): Observable<any> {
    return this.http.post(`/alertSys/insertActionCondition/`, condition);
  }

  postEventSchedule(schedule: any): Observable<any> {
    return this.http.post(`/alertSys/insertActionSchedule/`, schedule);
  }

  postActionEmployee(employee: any): Observable<any> {
    return this.http.post(`/alertSys/insertActionEmployee/`, employee);
  }

  postActionExecution(execution: any): Observable<any> {
    return this.http.post(`/alertSys/insertActionExecution/`, execution);
  }

  getTableColumns(param: any): Observable<any> {
    return this.http.get(`/alertSys/getTableColumns/` + param);
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(`/alertSys/getAllEmployees/`);
  }

  getAllScheduleTypes(): Observable<any> {
    return this.http.get(`/alertSys/getAllScheduleTypes/`);
  }

  getexectuionstat(): Observable<any> {
    return this.http.get(`/alertSys/getexectuionstat/`);
  }

  getsuccessfailurestat(): Observable<any> {
    return this.http.get(`/alertSys/getsuccessfailurestat/`);
  }

  getscheduletypestat(): Observable<any> {
    return this.http.get(`/alertSys/getscheduletypestat/`);
  }

  postEventUpdate(eventID: any, updateColumns): Observable<any> {
    return this.http.post(`/alertSys/changeEventStatus/` + eventID, updateColumns);
  }

  validateConditions(conditions: any): Observable<any> {
    return this.http.post(`/alertSys/validateConditions/`, conditions);
  }

  // logs ..
  getAllEventAudit(): Observable<any> {
    return this.http.get(`/alertSys/getAllEventAudit/`);
  }

  getAllActionResults(): Observable<any> {
    return this.http.get(`/alertSys/getAllActionResults/`);
  }

  getAllScheduleLog(): Observable<any> {
    return this.http.get(`/alertSys/getAllScheduleLog/`);
  }

}
