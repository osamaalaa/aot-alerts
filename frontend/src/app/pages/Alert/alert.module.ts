import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAssignmentComponent } from './new-assignment/new-assignment.component';
import { NewConditionComponent } from './new-condition/new-condition.component';
import { NewActionExcutionComponent } from './new-action-excution/new-action-excution.component';
import { NewEventComponent } from './new-event/new-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { SharedModule } from 'src/app/shared.module';
import { ChartistModule } from 'ng-chartist';
import { AlertRouterModule } from './alert-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { LogsComponent } from './logs/logs.component';
import { ScheduleLogsComponent } from './logs/schedule-logs/schedule-logs.component';
import { ResultsComponent } from './logs/results/results.component';
 
 
import { NewEmployeeModalComponent } from './new-employee-modal/new-employee-modal.component';
import { NewConditionModalComponent } from './new-condition-modal/new-condition-modal.component';
import { ModalComponent } from './modal/modal.component';

 
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
 
 
 
 
const COMPONENTS = [
  NewEventComponent,
   NewAssignmentComponent, 
   NewConditionComponent, 
   NewActionExcutionComponent,
   DashboardComponent,
   LogsComponent,
   ScheduleLogsComponent,
   ResultsComponent,
   NewEmployeeModalComponent,
   NewConditionModalComponent,
   ModalComponent
]
const PROVIDERS = [
  //NewAssignmentComponent, NewConditionComponent, NewActionExcutionComponent
]
@NgModule({
  imports: [
    CommonModule,
    CleanUIModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    AlertRouterModule,ChartsModule,RichTextEditorAllModule
  ],
  declarations: [...COMPONENTS],
  providers: [...PROVIDERS],
})
export class AlertModule{}