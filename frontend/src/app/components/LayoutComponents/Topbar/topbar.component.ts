import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'cui-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  currentLang:string;
  languageSwitch;
  constructor(
    private translateService:TranslateService,
    private languageService:LanguageService
    ){
    this.currentLang = this.languageService.getCurrentLang();
    this.checkCurrentLang()
  }
  checkCurrentLang(){
    if(this.currentLang == 'ar') {
      this.languageSwitch = true
    }
    else{
      this.languageSwitch = false
    }
  }

  changeLang(lang){
    this.languageService.setLanguage(lang);
  }

  
  onLanguageChange(lang){
    if(lang){
      this.changeLang('ar')
    } else {
      this.changeLang('en')
    }
    // console.log(lang)
  }
}
