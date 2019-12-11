import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NewEventComponent } from './new-event/new-event.component';
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogsComponent } from './logs/logs.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: 'dashboard'
  },
  {
    path: 'Eventsetup',
    component: NewEventComponent,
    data: { key: 'Event', title: 'Event setup' },
    //canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { key: 'dashboard', title: 'view' },
    //canActivate: [AuthGuard],
  },
  {
    path: 'logs',
    component: LogsComponent,
    data: { key: 'logs', title: 'logs' },
    canActivate: [AuthGuard],
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class AlertRouterModule { }