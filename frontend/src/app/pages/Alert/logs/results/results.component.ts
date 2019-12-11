import { BasicService } from '../../../../services/basic.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ResultsModelService} from './results.model.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers:[ResultsModelService]
})
export class ResultsComponent implements OnInit {

  actioresults: any[];
  headElements = [
    { LABEL: 'Exectuion ID', NAME: 'EXECUTION_ID' },
    { LABEL: 'Execution Type', NAME: 'EXECUTION_TYPE' },
    { LABEL: 'Identifier EN', NAME: 'EXECUTION_IDENTIFIER_EN' },
    { LABEL: 'Result Message', NAME: 'RESULT_MESSAGE' },
    { LABEL: 'Created Date', NAME: 'CREATED_DATE' },
    { LABEL: 'Created By', NAME: 'CREATED_BY' }
  ];
  orderby: any = 'EXECUTION_ID';
  lasttype: any = 'asc';
  searchText: any;
  pageval: any = [];
  page: any = 1;
  pagecount: any = 5;
  totalcount: any;
  mreturn: any = [];
  isDataLoading: boolean = false
  constructor(private basicService: BasicService,
    public resultsModelService:ResultsModelService,private ui: UIService,
    private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }
  searchItems(): void {
    this.resultsModelService.searchItems(this.searchText)
  }

  fetchData(): void {
    this.isDataLoading = true
    this.basicService.getAllActionResults().subscribe(
      data => {
        this.resultsModelService.savedData = data.rows
        this.resultsModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting template list : ' + error)
      },
    )
  }
  sortData(sort: { key: string; value: string }): void {
    this.resultsModelService.sortData(sort)
  }
 
 
   
}
