import { CommonValidators } from '../../../validators/CommonValidators';
import { BasicService } from '../../../services/basic.service';
import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Subject, forkJoin } from 'rxjs';
import {FormArray,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';

import { AfterViewInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { Input, Output, EventEmitter } from '@angular/core';
 
@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.scss']
})
export class NewAssignmentComponent implements OnInit {

  @ViewChild(NzAutocompleteModule) completer: NzAutocompleteModule;
  results: any;
  @Output() assignmentEvent = new EventEmitter<any[]>();
  action: Subject<any> = new Subject();
  error: any = false;
  employees: Array<any> = [];
  tempemployees: any[] = [];
  employeeForm: FormGroup;
  //=========filter data search============
  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;
  //==============================
  EMPLOYEE_ID = new FormControl('', [Validators.required]);
  //NAME = new FormControl('', []);
  ui: any;

  constructor(
    //public modalRef: MDBModalRef,
    private formBuilder: FormBuilder,
    private basicService: BasicService,
    //private commonvalidator: CommonValidators
  ) {

    //this.getAllLookups()

  }
  getAllLookups() {
    forkJoin(
      this.basicService.getAllEmployees()).subscribe(result => {
        this.employees = result[0].rows;
      }, error => {
        this.ui.createMessage('error', 'Error while fetching data' + error && error.error ? error.error.message : '')
      })
  }
  sendFormData() {
    this.assignmentEvent.emit(this.employeeForm.getRawValue());
  }
  onYesClick() {
    debugger;
    if (this.employeeForm.valid) {
      this.basicService.getAllEmployees().subscribe(data => {
        if (data.rows.filter(e => e.EMPLOYEE_ID === this.employeeForm.get('EMPLOYEE_ID').value).length <= 0) {
          this.error = true;
        } else {
          this.error = false;

          console.log(this.employeeForm.getRawValue());

          this.employees.push(this.employeeForm.getRawValue());
          console.log(this.employees);
          this.sendFormData();
          console.log(this.employeeForm.value)
          this.action.next(this.employeeForm.value);
          //this.modalRef.hide();
        }
      });

    } else {
      this.error = true;
    }
  }
  createForm(): void {
    this.employeeForm = this.formBuilder.group({
      EMPLOYEE_ID: this.EMPLOYEE_ID.value["EMPLOYEE_ID"],
      NAME: this.EMPLOYEE_ID.value["NAME"]
    });
  }
  ngOnInit() {
    this.createForm();
    this.getAllLookups();
  }
 
  onChange(event: any) {
    if (this.employeeForm.valid) {
      this.employeeForm.patchValue(event)
      console.log(this.employeeForm.value);
    }
  }
}
