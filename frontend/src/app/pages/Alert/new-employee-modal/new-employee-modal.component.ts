import { CommonValidators } from '../../../validators/CommonValidators';
import { BasicService } from '../../../services/basic.service';
import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import {AfterViewInit, ViewChild} from '@angular/core';
import {of} from 'rxjs';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';


@Component({
  selector: 'app-new-employee-modal',
  templateUrl: './new-employee-modal.component.html',
  styleUrls: ['./new-employee-modal.component.scss']
})
export class NewEmployeeModalComponent implements OnInit, AfterViewInit {
  @ViewChild(NzAutocompleteModule) completer: NzAutocompleteModule;
  results: any;
  action: Subject<any> = new Subject();
  error: any = false;
  employees: Array<any> = [];
  tempemployees: any[] = [];
  employeeForm: FormGroup;

  EMPLOYEE_ID = new FormControl('', [Validators.required]);
  NAME = new FormControl('', []);

  constructor(
    public modalRef: NzModalModule,
    private formBuilder: FormBuilder,
    private basicService: BasicService,
    //private commonvalidator: CommonValidators
  ) {

    this.employeeForm = this.formBuilder.group({
      EMPLOYEE_ID: this.EMPLOYEE_ID,
      NAME: this.NAME
    });

    this.results = this.searchEntries(this.employeeForm.get('NAME').value);
  }

  onYesClick() {
  if (this.employeeForm.valid) {
    this.basicService.getAllEmployees().subscribe(data => {
    if (data.rows.filter(e => e.EMPLOYEE_ID === this.employeeForm.get('EMPLOYEE_ID').value).length <= 0) {
      this.error = true;
    } else {
      this.error = false;
      this.action.next(this.employeeForm.value);
      this.modalRef=false;
    }
    });

  } else {
    this.error = true;
  }
  }

  onNoClick() {
    this.action.next('NO');
    this.modalRef=false;
  }

  ngOnInit() {
    this.fillLists();
  }

  fillLists() {
    this.basicService.getAllEmployees().subscribe(
      data => {

          this.employees = data.rows;
      },
      error => {
        console.log('error while getting Tables');
      }
    );
  }

  getDataItems() {
    return this.employees;
  }

  searchEntries(term: string) {
    return of(this.getDataItems().filter((data: any) => data.NAME.toString().toLowerCase().includes(term.toString().toLowerCase())));
  }

  getFilteredData() {
    this.results = this.searchEntries(this.employeeForm.get('NAME').value);
  }

  onChange() {
    this.getFilteredData();
  }

   ngAfterViewInit() {
    // this.completer.selectedItemChanged().subscribe((data: any) => {
    //   this.employeeForm.get('NAME').setValue(data.text.NAME);
    //   this.employeeForm.get('EMPLOYEE_ID').setValue(data.text.EMPLOYEE_ID);
    //   this.getFilteredData();
    //  });
   }
  }
