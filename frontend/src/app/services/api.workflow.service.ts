import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WorkFlowService{
    workFlowCheckHeader:HttpHeaders;
    constructor(private http:HttpClient){
        this.workFlowCheckHeader = new HttpHeaders().set('RESOURCE_NAME','WORKFLOW')
    }


    pushRequest(formData):Observable<any>{
        return this.http.post(`/requests/requestSubmit`,formData,{
            headers:this.workFlowCheckHeader
        })
    }

    newRequest(formData:any):Observable<any>{
        return this.http.post(`/requests/newrequest`,formData,{
            headers:this.workFlowCheckHeader
        })
    }

    newAction(formData:any):Observable<any>{
        return this.http.post(`/newactions/takenewaction`,formData,{
            headers:this.workFlowCheckHeader
        })
    }


    approveRequest(formData):Observable<any>{
        return this.http.post(`/approveactions/takeapproveaction`,formData,{
            headers:this.workFlowCheckHeader
        })
    }
    rejectRequest(formData):Observable<any>{
        return this.http.post(`/rejectactions/takerejectaction`,formData,{
            headers:this.workFlowCheckHeader
        })
    }


}