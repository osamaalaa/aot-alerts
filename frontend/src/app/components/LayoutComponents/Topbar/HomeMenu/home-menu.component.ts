import { Component, OnDestroy } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';
import { HomeMenuService } from './home-menu.service';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'cui-topbar-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss'],
  providers:[HomeMenuService]
  
})
export class TopbarHomeMenuComponent implements OnDestroy {


  subscriptionForRefresh:Subscription;
  constructor(
    private http:HttpClient,
    private homeMenuService:HomeMenuService
    ){
    this.startPolling();

    this.subscriptionForRefresh = this.homeMenuService.refreshNotification$.subscribe((shouldRefresh)=>{
      if(shouldRefresh){
        this.fetchApprovalListing();
      }
    })

  }
  
  subscription: Subscription;

  startPolling(){
    this.subscription = timer(0, 100000).subscribe(result => {
      this.fetchApprovalListing()
    });  
  }

  stopPolling(){
    this.subscription.unsubscribe()
  }



  notificationList:any[] = [];

  isFetchingData:boolean = false;
  fetchApprovalListing(){
    this.isFetchingData = true;
    let DESTINATION_ID = JSON.parse(localStorage.getItem('user')).ADDRESS_BOX_ID;
    // this.http.get(`/approvals/getAllApprovals/${DESTINATION_ID}`).subscribe(
    //   data=>{
    //     this.notificationList = data['rows']
    //     .filter(
    //       o=>(o.REQ_TYPE_ID == CONSTANTS.WORKFLOW.REQUEST_TYPE.INV_OPEN_BALANCE && o.INV_OPEN_BALANCE_ID) || 
    //       o.REQ_TYPE_ID == CONSTANTS.WORKFLOW.REQUEST_TYPE.INV_TRANSFER || 
    //       o.REQ_TYPE_ID == CONSTANTS.WORKFLOW.REQUEST_TYPE.RCV_DOCUMENT);
    //     this.isFetchingData = false;
    //   },
    //   error=>{
    //     this.isFetchingData = false;
    //   }
    // )
  }




  dropdownClosed(isDropDownOpen:boolean){
    if(isDropDownOpen){
      this.stopPolling();
    }else{
      this.startPolling();
    }
  }


  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }

    if(this.subscriptionForRefresh){
      this.subscriptionForRefresh.unsubscribe();
    }
  }

}
