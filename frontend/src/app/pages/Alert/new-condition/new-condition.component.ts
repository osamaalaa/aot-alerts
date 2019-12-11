import { Component, OnInit } from '@angular/core';
//import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject, forkJoin } from 'rxjs';
import {Input,Output,EventEmitter} from '@angular/core';
import {FormArray,FormGroup, FormControl, Validators, FormBuilder, Form} from '@angular/forms';
import { BasicService } from '../../../services/basic.service';
//import {MdbAutoCompleterComponent} from 'ng-uikit-pro-standard';
import {AfterViewInit, ViewChild} from '@angular/core';
import {of} from 'rxjs';
import { UIService } from 'src/app/services/ui.service';

//import{ConditionDataService}from './../services/condition-data.service';

@Component({
  selector: 'app-new-condition',
  templateUrl: './new-condition.component.html',
  styleUrls: ['./new-condition.component.scss']
})
export class NewConditionComponent implements OnInit {

  @Output() formEvent=new EventEmitter<any[]>();
  public data: Array<any> ;
  conditions: any[] = [];
  showForm:boolean;
  action: Subject<any> = new Subject();
  error: any = false;
  conditionsTypes: Array<any>;
  conTypes: Array<any>;
  operatorsTypes: any[]=[];
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
  //=========filter data search============
  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;
  FULLNAME:any
//==============================
  //@ViewChild(MdbAutoCompleterComponent) completer: MdbAutoCompleterComponent;
  results: any
  
  constructor(
   // public modalRef: MDBModalRef,
    private formBuilder: FormBuilder,
    private basicService: BasicService,private ui: UIService
   // private conditionDataService: ConditionDataService
  ) {
   // this.conditionDataService.SendData(this.conditionsForm);
   //console.log(this.data);
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
    this.getAllLookups()
  }
  getAllLookups() {
    forkJoin(
      this.basicService.getallTables()).subscribe(result => {
        this.tablenames = result[0].rows;
      }, error => {
        this.ui.createMessage('error', 'Error while fetching data' + error && error.error ? error.error.message : '')
      })
  }
  //Get tabel data 
  // search(value: string): void {
  //   this.basicService.getallTables().subscribe(data => {
  //     const tablenames: Array<{ FULLNAME: string; OBJECT_NAME: string }> = [];
  //     data.result.forEach(item => {
  //       tablenames.push({
  //         FULLNAME: item[0],
  //         OBJECT_NAME: item[1]
  //       });
  //     });
  //     this.tablenames = tablenames;
  //   });
  //     error => {
  //       console.log('error while getting Tables');
  //     }
  // }
  
  sendFormData(){
    this.formEvent.emit(this.conditions);
   }
  onYesClick(){
   
  if (this.conditionsForm.valid) {
  this.basicService.getallTables().subscribe(data => {
      
    if (data.rows.filter(e => e.FULLNAME === this.conditionsForm.get('TABLE_NAME').value).length <= 0) {
     
      this.error = true;
    } else {
      console.log(this.selectedDataType);
      if (this.selectedDataType === 'VARCHAR2' || this.selectedDataType === 'CHAR') {
        this.conditionsForm.get('CONDITION_VALUE').setValidators(Validators.pattern('[A-Z a-z]'));
        this.conditionsForm.get('CONDITION_VALUE').updateValueAndValidity();
       }
    if (this.conditionsForm.get('CONDITION_VALUE').valid) {
      this.error = false;
      this.conditions.push(this.conditionsForm.getRawValue());
      this.sendFormData();
      console.log(" all cond"+ this.conditions);
      this.action.next(this.conditionsForm.value);
      this.showForm=false;
     // this.modalRef.hide();
    } else {
      this.error = true;
    }
    }
  });
  } else {
    this.error = true;
  }
  }
  showConForm(){
    this.showForm=true;
  }
  onNoClick() {
   this.showForm=false;
  }

  ngOnInit() {
    this.fillLists();
  }

  fillLists() {
    this.tablecolumns = null;
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
  }
  selectedtable(tableName: any) {
    this.tempTablecolumns = [];
    this.tablecolumns = [];
    this.basicService.getTableColumns(tableName).subscribe(

      columns => {
        columns.rows.forEach(element => {

          this.tempTablecolumns.push({
            value: element.COLUMN_NAME,
            label: element.COLUMN_NAME,
            type: element.DATA_TYPE
          });
        });
        this.tablecolumns = this.tempTablecolumns;
      },
      error => {
        console.log('error while getting table columns ..');
      }
    );
  }
  getDataItems() {
    return this.tablenames;
  }
  searchEntries(term: string) {

    return of(this.getDataItems().filter((data: any) => data.FULLNAME.toString().toLowerCase().includes(term.toString().toLowerCase())));
  }
 
  fillcoulmn(event?:any)
  {
    this.tempTablecolumns = [];
    this.tablecolumns = [];
   
    if(event !== undefined){
      this.basicService.getTableColumns(event).subscribe(
        columns => {
          columns.rows.forEach(element => {
            this.tempTablecolumns.push({
              value: element.COLUMN_NAME,
              label: element.COLUMN_NAME,
              type: element.DATA_TYPE
            });
          });
          //debugger
          this.tablecolumns = this.tempTablecolumns;
        },
        error => {
          console.log('error while getting table columns ..');
        }
      );
    }
    
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
