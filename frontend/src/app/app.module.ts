import { ArraySortPipe } from './pipes/sort.pipe'
import { MyFilterPipe } from './pipes/myfilter.pipe'
import { FloorPipe } from './pipes/floor.pipe'
import { InterceptorService } from './services/interceptor.service'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { IconDefinition } from '@ant-design/icons-angular'
import * as AllIcons from '@ant-design/icons-angular/icons'
import { NZ_ICONS } from 'ng-zorro-antd'
import { NgProgressModule } from '@ngx-progressbar/core'
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { NgProgressHttpModule } from '@ngx-progressbar/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { reducers, metaReducers } from './store/reducers'

 
import { HTTP_INTERCEPTORS } from '@angular/common/http'

/**
 * Locale Registration
 */
import { registerLocaleData } from '@angular/common'
import { default as localeEn } from '@angular/common/locales/en'
import { NZ_I18N, en_US as localeZorro } from 'ng-zorro-antd'
import { ItemsValidators } from './validators/itemsValidators'
import { UIService } from './services/ui.service';
import { ProfileService } from './services/profile.service';
import { DataService } from './services/data.service';
import { StatisticsService } from './services/statistics.service';
import { StoresService } from './services/stores.service';
import { GeneralSetupService } from './services/general-setup.service';
import { ApiService } from './services/api.service';
import { WorkFlowService } from './services/api.workflow.service';
import { ItemsService } from './services/items.service';
import { DashboardService } from './services/dashboard.service';
import { ClickStopPropagation } from './directives/stop-propogation.directive';
import { OperationsService } from './services/operations.service';
import { NumbersOnly } from './directives/number.directive';
import { BasicService } from './services/basic.service'
import { LanguageService } from './services/language.service'
import { TranslateModule } from '@ngx-translate/core'

const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
registerLocaleData(localeEn, 'en')

/**
 * AntDesign Icons
 */
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition
}
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [AppComponent, FloorPipe, MyFilterPipe, ArraySortPipe,ClickStopPropagation,NumbersOnly],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    /**
     * NgRx Store
     */
    
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    /**
     * Nprogress Modules
     */
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,
    TranslateModule.forRoot(),
    /**
     * Routing Module
     */
    AppRoutingModule,
  ],
  providers: [
    ...LOCALE_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: NZ_ICONS, useValue: icons },
    ItemsService,
    StoresService,
    UIService,
    ProfileService,
    DataService,
    ItemsValidators,
    StatisticsService,
    GeneralSetupService,
    BasicService,
    ApiService,
    WorkFlowService,
    DashboardService,
    OperationsService,
    LanguageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
