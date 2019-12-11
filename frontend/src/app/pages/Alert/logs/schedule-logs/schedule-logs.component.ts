import { BasicService } from '../../../../services/basic.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ScheduleModelService} from './schedule.model.service'
import { UIService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-schedule-logs',
  templateUrl: './schedule-logs.component.html',
  styleUrls: ['./schedule-logs.component.scss']
  ,providers:[ScheduleModelService]
})
export class ScheduleLogsComponent implements OnInit {

  scheduleLogs: any[];
  
  orderby: any = 'EVENT_ID';
  lasttype: any = 'asc';
  searchText: any;
  pageval: any = [];
  page: any = 1;
  pagecount: any = 5;
  totalcount: any;
  mreturn: any = [];
  isDataLoading: boolean = false
  
  constructor(private basicService: BasicService,public scheduleModelService:ScheduleModelService,
    private router: Router,private ui: UIService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.isDataLoading = true
    this.basicService.getAllScheduleLog().subscribe(
      data => {
        this.scheduleModelService.savedData = data.rows
        this.scheduleModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting template list : ' + error)
      },
    )
  }

  searchItems(): void {
    this.scheduleModelService.searchItems(this.searchText)
  }
  sortData(sort: { key: string; value: string }): void {
    this.scheduleModelService.sortData(sort)
  }
 
}
