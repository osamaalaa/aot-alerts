import { ResultsComponent } from './results/results.component';
import { BasicService } from '../../../services/basic.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LogsModelService} from './logs.model.service'
import { UIService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  providers:[LogsModelService]
})
export class LogsComponent implements OnInit {

  eventaudit: any[];
   
  orderby: any = 'EVENT_ID';
  lasttype: any = 'asc';
  searchText: any;
  pageval: any = [];
  //page: any = 1;
 // pagecount: any = 5;
  totalcount: any;
  mreturn: any = [];
  isDataLoading: boolean = false
  constructor(private basicService: BasicService,private ui: UIService,
    private router: Router,public logsModelService:LogsModelService) {}

  ngOnInit() {
    this.fetchData();
  }
  
  searchItems(): void {
    this.logsModelService.searchItems(this.searchText)
  }

  fetchData(): void {
    this.isDataLoading = true
    this.basicService.getAllEventAudit().subscribe(
      data => {
        this.logsModelService.savedData = data.rows
        this.logsModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting template list : ' + error)
      },
    )
  }
  sortData(sort: { key: string; value: string }): void {
    this.logsModelService.sortData(sort)
  }

}
