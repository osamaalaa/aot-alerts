import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { AppPreloader } from 'src/app/app-routing-loader'
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard'

// layouts & notfound
import { LayoutLoginComponent } from 'src/app/layouts/Login/login.component'
import { LayoutMainComponent } from 'src/app/layouts/Main/main.component'
import { NotFoundComponent } from 'src/app/pages/404.component'

// user
import { LoginComponent } from 'src/app/pages/user/login/login.component'
import { ForgotComponent } from 'src/app/pages/user/forgot/forgot.component'
 
 
const COMPONENTS = [LoginComponent, ForgotComponent, NotFoundComponent]

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/login', // 'dashboard/alpha',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: LayoutLoginComponent,
    children: [
      { path: 'login', component: LoginComponent, data: { title: 'Login' } },
      { path: 'forgot', component: ForgotComponent, data: { title: 'Restore Password' } },
    ],
  },

{
   path: '',
   component: LayoutMainComponent,
   children: [
     {
       path: 'alert',
       loadChildren: 'src/app/pages/Alert/alert.module#AlertModule',
     },
      
   ],
 },
  // { path: 'newevent', component: NewEventComponent,  canActivate: [AuthService]  },
  // {
  //   path: 'Project',
  //   component: LayoutMainComponent,
  //   children: [
  //     { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
  //   ],
  // },
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: AppPreloader,
    }),
    LayoutsModule,
  ],
  providers: [AppPreloader],
  declarations: [...COMPONENTS],
  exports: [RouterModule],
})
export class AppRoutingModule {}
