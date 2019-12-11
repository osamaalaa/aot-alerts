import { CommonValidators } from '../../../validators/CommonValidators';
import { BasicService } from '../../../services/basic.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { RichTextEditorAllModule,ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { Subject } from 'rxjs';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-new-action-excution',
  templateUrl: './new-action-excution.component.html',
  styleUrls: ['./new-action-excution.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService]
})
export class NewActionExcutionComponent implements OnInit {
  public tools: object = {
    items: [
           'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
           'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
           'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
           'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
           'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
           'Image', '|', 'ClearFormat', 'Print', 'SourceCode']
   };
  userData:any;
  results: any;
 @Output() executionsEvent=new EventEmitter<any[]>();
  action: Subject<any> = new Subject();
  error: any = false;
  executionTypes: Array<any> = [];
  executionForm: FormGroup;
  executions: any[] = [];
  EXECUTION_TYPE = new FormControl('MESSAGE', [Validators.required]);
  EXECUTION_IDENTIFIER_EN = new FormControl('', [Validators.required]);
  EXECUTION_IDENTIFIER_AR = new FormControl('', [Validators.required]);
  
  SUPJECT=new FormControl({value: '', disabled: true});
  POST_MESSAGE = new FormControl({value: '', disabled: true});
  CREATED_BY = new FormControl({ disabled: true});

  constructor(
    private formBuilder: FormBuilder,
    private basicService: BasicService,
    //private commonvalidator: CommonValidators
  ) {
    this.userData=JSON.parse(localStorage.getItem('user'));
    console.log(this.userData.USER_NAME);
    if(this.userData!=null){
      this.CREATED_BY.setValue(this.userData.USER_NAME);
    }
     
    else
     { 
       this.CREATED_BY.setValue('AG');
      }
    this.executionForm = this.formBuilder.group({
      EXECUTION_TYPE: this.EXECUTION_TYPE,
      EXECUTION_IDENTIFIER_EN: this.EXECUTION_IDENTIFIER_EN,
      EXECUTION_IDENTIFIER_AR: this.EXECUTION_IDENTIFIER_AR,
     
      SUPJECT:this.SUPJECT,
      POST_MESSAGE: this.POST_MESSAGE,
      CREATED_BY : this.CREATED_BY
    });
  }

  onYesClick() {
    debugger;
  if (this.executionForm.valid) {
    this.error = false;
    if (!this.executionForm.contains('POST_MESSAGE')) {
      this.executionForm.get('POST_MESSAGE').enable();
    }
    this.action.next(this.executionForm.value);
    this.executions.push(this.executionForm.getRawValue());
    this.sendDate();
  } else {
    this.error = true;
  }
  }

  onNoClick() {
    this.action.next('NO');
  }

  ngOnInit() {
    //this.fillLists();
  }
  sendDate(){
    this.executionsEvent.emit(this.executions);
  }
  // fillLists() {
  //   this.executionTypes = [
  //     // { value: 'MESSAGE', label: 'Message' },
  //     // { value: 'DB', label: 'Database' },
  //     // { value: 'WS', label: 'Webservice' }
  //   ];
  // }

  changeExecutionType(event: any) {
 
   if (event === 'SMS' ) {
    this.executionForm.get('POST_MESSAGE').setValue('');
    this.executionForm.get('POST_MESSAGE').enable();
    this.executionForm.get('SUPJECT').setValue('');
    this.executionForm.get('SUPJECT').disable();
   }
   
   if(event === 'EMAIL'){
 
    this.executionForm.get('SUPJECT').setValue('');
    this.executionForm.get('SUPJECT').enable();
   }
 
   if (event === 'DB' || event === 'WS'){
    this.executionForm.get('POST_MESSAGE').setValue('');
    this.executionForm.get('POST_MESSAGE').enable();
 
    this.executionForm.get('SUPJECT').setValue('');
    this.executionForm.get('SUPJECT').disable();
   }
  }

}
