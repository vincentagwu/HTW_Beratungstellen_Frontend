import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'HTW-Saar Beratungstellen', url: '/folder/HTW-Saar Beratungstellen', icon: 'help' },
    // { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  picture:String = '../assets/png/logo.png';
  defaultLanguage = "./../assets/i18n/de.json";
  language: string = this.defaultLanguage;
  constructor(private translateService: TranslateService) {
    this.initializeApp();
  }

  
  initializeApp() {
    this.language = localStorage.getItem("language");

    if(this.language == null)
      localStorage.setItem("language", "de");

    this.language = localStorage.getItem("language");
    this.translateService.setDefaultLang(this.language);
    
  }

  


  languageChange(language) {  // add this
    this.translateService.use(language);  // add this
    localStorage.setItem("language", language);
  }
}
