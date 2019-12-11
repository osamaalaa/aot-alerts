import { NewEmployeeModalComponent } from './../new-employee-modal/new-employee-modal.component';
import { NewConditionModalComponent } from './../new-condition-modal/new-condition-modal.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { BasicService } from '../../../services/basic.service';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';
//import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';

import { from } from 'rxjs';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  public data = {};
  error
  formData:any;
  ErrorMsg:string;
  status: any = 'hide';
  conditions: any;
  selectedconditions: any[] = [];
  employees: any[] = [];
  selectedemployees: any[] = []; 
  executions: any[] = [];
  selectedexecutions: any[] = [];
  //modalRef: MDBModalRef;
  actionTypes: Array<any>;
  tmpscheduleTypes: any[] = []; 
  scheduleTypes: Array<any>;
  step1Form: FormGroup;
  step3Form: FormGroup;
  userData:any;
  ACTION_ID = new FormControl('', [Validators.required]);
  EVENT_ID = new FormControl('');
  EVENT_NAME = new FormControl('', [Validators.required]);
  EVENT_DESC = new FormControl('', [Validators.required]);
  ENABLED = new FormControl({ value: true, disabled: false });
  ACTION_ENABLED = new FormControl({ value: true, disabled: true });
  CREATED_BY = new FormControl({ value: 'AG', disabled: true }, [
    Validators.required
  ]);
  SCHEDULE_CREATED_BY = new FormControl({ value: 'AG', disabled: true }, [
    Validators.required
  ]);
  ACTION_NAME = new FormControl('', [Validators.required]);
  ACTION_DESC = new FormControl('', [Validators.required]);
  ACTION_TYPE = new FormControl('BOTH', [Validators.required]);
  CONDITION_NAME = new FormControl('', [Validators.required]);
  CONDITION_DESC = new FormControl('', [Validators.required]);
  CONDITION_TYPE = new FormControl('', [Validators.required]);
  TABLE_NAME = new FormControl('', [Validators.required]);
  COLUMN_NAME = new FormControl('', [Validators.required]);
  CONDITION_OPERATOR = new FormControl('', [Validators.required]);
  CONDITION_VALUE = new FormControl('', [Validators.required]);
  AND_OR = new FormControl('', [Validators.required]);
  ACTION_CREATED_BY = new FormControl({disabled: true }, [
    Validators.required
  ]);
  TYPE_ID = new FormControl('', [Validators.required]);
  SCHEDULE_ACTIVE = new FormControl({ value: 'Y', disabled: true }, [
    Validators.required
  ]);
  constructor(
   // private modalService: MDBModalService,
    //private modalRef:MDBModalRef,
    private route: ActivatedRoute,
    private basicService: BasicService,
    private formBuilder: FormBuilder,
    private router: Router,
    //private modalService: MDBModalService
  ) {
////////////
    this.userData=JSON.parse(localStorage.getItem('user'));
    console.log(this.userData.USER_NAME);
    if(this.userData!=null){
      this.ACTION_CREATED_BY.setValue(this.userData.USER_NAME);
      this.SCHEDULE_CREATED_BY.setValue(this.userData.USER_NAME);
    }
     
    else
     { 
       this.ACTION_CREATED_BY.setValue('AG');
       this.SCHEDULE_CREATED_BY.setValue('AG');
      }
//////////////////

    console.log(this.conditions + "  from new event comp");
    this.step1Form = this.formBuilder.group({
      EVENT_NAME: this.EVENT_NAME,
      EVENT_DESC: this.EVENT_DESC,
      CREATED_BY: this.CREATED_BY,
      ENABLED: this.ENABLED,
      ACTION_NAME: this.ACTION_NAME,
      ACTION_DESC: this.ACTION_DESC,
      ACTION_TYPE: this.ACTION_TYPE,
      ACTION_ENABLED: this.ACTION_ENABLED,
      ACTION_CREATED_BY: this.ACTION_CREATED_BY
    });

    this.step3Form = this.formBuilder.group({
      TYPE_ID: this.TYPE_ID,
      SCHEDULE_ACTIVE: this.SCHEDULE_ACTIVE,
      SCHEDULE_CREATED_BY: this.SCHEDULE_CREATED_BY
    });
    ///////////////////////////
    
  }
 recieveFormData($event){
   
  this.conditions=$event;
  console.log(this.conditions);
 }
 RecieveAssignmentData($event){
  
  this.employees.push($event);
  
  console.log(this.employees);
 }
 RecieveExecutionstData($event){
   this.executions=$event;
   console.log(this.executions);
 }
  ngOnInit() {
    this.fillLists();
  }

  reset() {}

  formSubmit() {}

  finishAll() {
    
    if (
      !this.step1Form.dirty ||
       !this.step3Form.dirty ||
       this.conditions.length <= 0 ||
       this.employees.length <= 0 ||
       this.executions.length <= 0
       ) {

        this.openModal(
          'Error while Enter Event Details ..',
          'please be sure from entering at least Event Def, Action, one condition, Assignee, Execution and schedule plan ..'
        );
    } else {
      console.log(this.conditions);
      //this.basicService.validateConditions(this.conditions).subscribe(data => {
       // if (data.rows[0].MYRESULT >= 0) {
          this.basicService.postEventDefs(this.getFormValue('EVENTS', '')).subscribe(
            eventData => {
              this.basicService
                .postEventAction(
                  this.getFormValue('ACTIONS', eventData.rows.R_EVENT_ID)
                )
                .subscribe(
                  actionData => {
                    this.assigncolumntocondition(actionData.rows.R_ACTION_ID);
                    this.conditions.forEach(value => {
                      this.basicService.postEventCondition(value).subscribe(
                        conditions => {
                          this.assigncolumntoemployees(actionData.rows.R_ACTION_ID);
                          this.employees.forEach(empvalue => {
                            this.basicService.postActionEmployee({
                              EMPLOYEE_ID: empvalue.EMPLOYEE_ID,
                              ACTION_ID: empvalue.ACTION_ID}).subscribe(
                              employees => {
                                this.assigncolumntoexecutions(actionData.rows.R_ACTION_ID);
                                this.executions.forEach(exevalue => {
                                  this.basicService.postActionExecution({
                                                                        EXECUTION_TYPE: exevalue.EXECUTION_TYPE,
                                                                        ACTION_ID: exevalue.ACTION_ID,
                                                                        EXECUTION_IDENTIFIER_EN: exevalue.EXECUTION_IDENTIFIER_EN,
                                                                        EXECUTION_IDENTIFIER_AR: exevalue.EXECUTION_IDENTIFIER_AR,
                                                                        CREATED_BY:exevalue.CREATED_BY,
                                                                        POST_MESSAGE: exevalue.POST_MESSAGE
                                                                      }).subscribe(
                                    executions => {
                                        this.basicService.postEventSchedule({
                                          ACTION_ID : actionData.rows.R_ACTION_ID,
                                          TYPE_ID: this.step3Form.get('TYPE_ID').value,
                                          SCHEDULE_ACTIVE: this.step3Form.get('SCHEDULE_ACTIVE').value,
                                          CREATED_BY: this.step3Form.get('SCHEDULE_CREATED_BY').value
                                        }).subscribe(
                                          schedule => {
                                            this.router.navigate(['/alert/dashboard']);
                                          },
                                          schError => {

                                            this.openModal(
                                              '',
                                              'Error while Saving Schedule, please contact system Administrator ..'
                                            );
                                          }
                                        );
                                    },
                                    exeError => {

                                      this.openModal(
                                        '',
                                        'Error while Saving Execution, please contact system Administrator ..'
                                      );
                                    }
                                  );
                                });
                              },
                              empError => {

                                this.openModal(
                                  '',
                                  'Error while Saving Employees, please contact system Administrator ..'
                                );
                              }
                            );
                          });
                        },
                        condError => {

                          this.openModal(
                            '',
                            'Error while Saving Conditions, please contact system Administrator ..'
                          );
                        }
                      );
                    });
                  },
                  actionError => {


                    this.openModal(
                      '',
                      'Error while Saving Defination Actions, please contact system Administrator ..'
                    );
                  }
                );
            },
            eventError => {

              this.openModal(
                '',
                'Error while Saving Definations, please contact system Administrator ..'
              );
            }
          );
        // }  else {

        //   this.openModal(
        //     '',
        //     'Validation Error, please build a Correct Condition Set ..'
        //   );
        // }
            //  },
            //  error => {

            //   this.openModal(
            //     '',
            //     'Validation Error, please build a Correct Condition Set ..'
            //   );
            //  });
    }

  }

  getFormValue(formName: string, param: any) {
    let result;
    if (formName === 'EVENTS') {
      let enabled = 'Y';
      if (this.step1Form.get('ENABLED').value === true) {
        enabled = 'Y';
      } else {
        enabled = 'N';
      }
      return (result = {
        EVENT_NAME: this.step1Form.get('EVENT_NAME').value,
        EVENT_DESC: this.step1Form.get('EVENT_DESC').value,
        ENABLED: enabled,
        CREATED_BY: this.step1Form.get('CREATED_BY').value
      });
    } else {
      let enabled = 'Y';
      if (this.step1Form.get('ACTION_ENABLED').value === true) {
        enabled = 'Y';
      } else {
        enabled = 'N';
      }
      return (result = {
        EVENT_ID: Number(param),
        ACTION_NAME: this.step1Form.get('ACTION_NAME').value,
        ACTION_DESC: this.step1Form.get('EVENT_DESC').value,
        ACTION_TYPE: this.step1Form.get('ACTION_TYPE').value,
        ENABLED: enabled,
        CREATED_BY: this.step1Form.get('ACTION_CREATED_BY').value
      });
    }
  }

   openModal(head: any, message: any) {
     const modalOptions = {
       backdrop: true,
       keyboard: true,
       focus: true,
       show: false,
       ignoreBackdropClick: false,
       class: '',
       containerClass: '',
       animated: true,
       data: {
         heading: 'Error',
         content: {
           heading: head,
           description: message
         }
       }
     };

    // this.modalRef = this.modalService.show(ModalComponent, modalOptions);
   }

  fillLists() {
    this.actionTypes = [
      { value: 'MESSAGE', label: 'MESSAGE', disabled: true },
      { value: 'BUSINESS', label: 'BUSINESS', disabled: true },
      { value: 'BOTH', label: 'BOTH' } // , disabled: true },
    ];
     

    this.basicService.getAllScheduleTypes().subscribe(
      scheduleTypes => {
        scheduleTypes.rows.forEach(element => {
          this.tmpscheduleTypes.push({
            value: element.TYPE_ID,
            label: element.EVERY_FACTOR + ' - ' + element.TYPE_NAME
          });
        });
        this.scheduleTypes = this.tmpscheduleTypes;
        //console.log(scheduleTypes);
      },
      error => {
        console.log('error while getting schedule types ..');
      }
    );
  }

  fillConditions() {
  //   this.modalRef = this.modalService.show(NewConditionModalComponent, {
  //     backdrop: true,
  //     keyboard: true,
  //     focus: true,
  //     show: false,
  //     ignoreBackdropClick: false,
  //     class: '',
  //     containerClass: '',
  //     animated: true
  // });

  // this.modalRef.content.action.subscribe( (result: any) => {
  //   if (result !== 'NO') {
  //   this.conditions.push(result);
  //   }
  // });
  }
  deleteConditions() {
     
    console.log(this.selectedconditions);
    this.selectedconditions.forEach(value => {
      this.conditions.splice(this.conditions.indexOf(value), 1);
    });

    this.selectedconditions = [];
  }

  selectunselect(event, cond: any) {
    
    console.log(event);
    console.log(cond);

    if (!event.checked) {
      this.selectedconditions.push(cond);
    } else {
      this.selectedconditions.splice(this.selectedconditions.indexOf(cond), 1);
    }
  }
  deleteEmployee() {
    this.selectedemployees.forEach(value => {
      this.employees.splice(this.employees.indexOf(value), 1);
    });
  }

  selectunselectEmployee(event, emp: any) {
    if (!event.checked) {
      this.selectedemployees.push(emp);
    } else {
      this.selectedemployees.splice(this.selectedemployees.indexOf(emp), 1);
    }
  }


  fillEmployees() {
  //   this.modalRef = this.modalService.show(NewEmployeeModalComponent, {
  //     backdrop: true,
  //     keyboard: true,
  //     focus: true,
  //     show: false,
  //     ignoreBackdropClick: false,
  //     class: '',
  //     containerClass: '',
  //     animated: true
  // });

  // this.modalRef.content.action.subscribe( (result: any) => {
  //   if (result !== 'NO') {
  //   this.employees.push(result);
  //   }
  // });
  }

  fillExecutions() {
  //   this.modalRef = this.modalService.show(NewActionExectuionComponent, {
  //     backdrop: true,
  //     keyboard: true,
  //     focus: true,
  //     show: false,
  //     ignoreBackdropClick: false,
  //     class: '',
  //     containerClass: '',
  //     animated: true
  // });

  // this.modalRef.content.action.subscribe( (result: any) => {
  //   if (result !== 'NO') {
  //   this.executions.push(result);
  //   }
  // });
  }
  deleteExecutions() {
    this.selectedexecutions.forEach(value => {
      this.executions.splice(this.executions.indexOf(value), 1);
    });

    this.selectedexecutions = [];
  }


  selectunselectExecutions(event, exe: any) {
    if (!event.checked) {
      this.selectedexecutions.push(exe);
    } else {
      this.selectedexecutions.splice(this.selectedexecutions.indexOf(exe), 1);
    }
  }

  assigncolumntocondition(val: any) {
    if (this.conditions.length > 0) {
      for (let i = 0; i < this.conditions.length; i++) {
        this.conditions[i].ACTION_ID = val;
    }
    }
  }

  assigncolumntoemployees(val: any) {
    if (this.employees.length > 0) {
      for (let i = 0; i < this.employees.length; i++) {
        this.employees[i].ACTION_ID = val;
    }
    }
  }

  assigncolumntoexecutions(val: any) {
    if (this.executions.length > 0) {
      for (let i = 0; i < this.executions.length; i++) {
        this.executions[i].ACTION_ID = val;
    }
    }
  }
}
/////////////////////////////////////////
