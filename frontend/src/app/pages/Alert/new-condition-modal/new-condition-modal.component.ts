//import { BasicService } from './../services/basic.service';
import { Component, OnInit } from '@angular/core';
//import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
//import {MdbAutoCompleterComponent} from 'ng-uikit-pro-standard';
import {AfterViewInit, ViewChild} from '@angular/core';
import {of} from 'rxjs';
@Component({
  selector: 'app-new-condition-modal',
  templateUrl: './new-condition-modal.component.html',
  styleUrls: ['./new-condition-modal.component.scss']
})
export class NewConditionModalComponent implements OnInit, AfterViewInit {
  action: Subject<any> = new Subject();
  error: any = false;
  conditionsTypes: Array<any>;
  conTypes: Array<any>;
  operatorsTypes: Array<any>;
  tablenames: Array<any> = [];
  tempTableNames: any[] = [];
  tempTablecolumns: any[] = [];
  tablecolumns: Array<any> = [];
  selectedDataType: any;
  conditionsForm: FormGroup;
  myType: any = 'text';
  ACTION_NAME = new FormControl('', [Validators.required]);
  ACTION_DESC = new FormControl('', [Validators.required]);
  ACTION_TYPE = new FormControl('miscellaneous', [Validators.required]);
  TABLE_NAME = new FormControl('', [Validators.required]);
  COLUMN_NAME = new FormControl('', [Validators.required]);
  CONDITION_OPERATOR = new FormControl('=', [Validators.required]);
  CONDITION_VALUE = new FormControl('', [Validators.required]);
  CREATED_BY = new FormControl('AG', [Validators.required]);
  AND_OR = new FormControl('');

  //@ViewChild(MdbAutoCompleterComponent) completer: MdbAutoCompleterComponent;
  results: any;
  constructor(
    //public modalRef: MDBModalRef,
    private formBuilder: FormBuilder,
    //private basicService: BasicService
  ) {
    this.conditionsForm = this.formBuilder.group({
      ACTION_NAME: this.ACTION_NAME,
      ACTION_DESC: this.ACTION_DESC,
      ACTION_TYPE: this.ACTION_TYPE,
      TABLE_NAME: this.TABLE_NAME,
      COLUMN_NAME: this.COLUMN_NAME,
      CONDITION_OPERATOR: this.CONDITION_OPERATOR,
      CONDITION_VALUE: this.CONDITION_VALUE,
      CREATED_BY: this.CREATED_BY,
      AND_OR: this.AND_OR
    });
    this.results = this.searchEntries(this.conditionsForm.get('TABLE_NAME').value);
  }

  // onYesClick() {
  // if (this.conditionsForm.valid) {
  //   this.basicService.getallTables().subscribe(data => {
  //   if (data.rows.filter(e => e.FULLNAME === this.conditionsForm.get('TABLE_NAME').value).length <= 0) {
  //     this.error = true;
  //   } else {
  //     console.log(this.selectedDataType);
  //     if (this.selectedDataType === 'VARCHAR2' || this.selectedDataType === 'CHAR') {
  //       this.conditionsForm.get('CONDITION_VALUE').setValidators(Validators.pattern('[A-Z a-z]'));
  //       this.conditionsForm.get('CONDITION_VALUE').updateValueAndValidity();
  //      }
  //   if (this.conditionsForm.get('CONDITION_VALUE').valid) {
  //     this.error = false;
  //     this.action.next(this.conditionsForm.value);
  //     this.modalRef.hide();
  //   } else {
  //     this.error = true;
  //   }
  //   }
  // });
  // } else {
  //   this.error = true;
  // }
  // }

  // onNoClick() {
  //   this.action.next('NO');
  //   this.modalRef.hide();
  // }

  ngOnInit() {
    this.fillLists();
  }

  fillLists() {
    this.conditionsTypes = [{ value: 'miscellaneous', label: 'miscellaneous' }];
    this.operatorsTypes = [
      { value: '=', label: '=' },
      { value: '>', label: '>' },
      { value: '<', label: '<' },
      { value: '>=', label: '>=' },
      { value: '<=', label: '<=' },
      { value: 'like', label: 'like' },
      { value: 'not like', label: 'not like' },
      { value: 'is null', label: 'is null' },
      { value: 'is not null', label: 'is not null' }
    ];
    this.conTypes = [
      { value: 'AND', label: 'AND' },
      { value: 'OR', label: 'OR' }
    ];

    // this.basicService.getallTables().subscribe(
    //   data => {
    //     this.tablenames = data.rows;
    //   },
    //   error => {
    //     console.log('error while getting Tables');
    //   }
    // );
  }

  // selectedtable(tableName: any) {
  //   this.tempTablecolumns = [];
  //   this.tablecolumns = [];
  //   //this.basicService.getTableColumns(tableName).subscribe(

  //     columns => {
  //       columns.rows.forEach(element => {

  //         this.tempTablecolumns.push({
  //           value: element.COLUMN_NAME,
  //           label: element.COLUMN_NAME,
  //           type: element.DATA_TYPE
  //         });
  //       });
  //       this.tablecolumns = this.tempTablecolumns;
  //     },
  //     error => {
  //       console.log('error while getting table columns ..');
  //     }
  //   );
  // }

  getDataItems() {
    return this.tablenames;
  }

  searchEntries(term: string) {

    return of(this.getDataItems().filter((data: any) => data.FULLNAME.toString().toLowerCase().includes(term.toString().toLowerCase())));
  }

  getFilteredData() {
    this.results = this.searchEntries(this.conditionsForm.get('TABLE_NAME').value);
  }

  onChange() {
    this.getFilteredData();
  }

   ngAfterViewInit() {
  //   this.completer.selectedItemChanged().subscribe((data: any) => {
  //     this.conditionsForm.get('TABLE_NAME').setValue(data.text.FULLNAME);
  //     this.getFilteredData();
  //     this.selectedtable(data.text.FULLNAME);
  //   });
    }

   selectedVal(event: any) {
    const selectedColumn = this.tablecolumns.filter(function (NAME) {
     return NAME.value === event;
    });
     this.selectedDataType = selectedColumn[0].type;
     if (this.selectedDataType === 'NUMBER') {
      this.conditionsForm.get('CONDITION_VALUE').setValue('');
      this.myType = 'number';
     } else if ( this.selectedDataType === 'DATE' || this.selectedDataType === 'TIMESTAMP') {
      this.conditionsForm.get('CONDITION_VALUE').setValue('');
      this.myType = 'date';
     }
   }

  }
