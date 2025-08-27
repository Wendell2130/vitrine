import { Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import translationsEN from '../../public/i18n/en.json'; 
import translationsPT from '../../public/i18n/pt.json'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
 
  protected readonly title = signal('vitrine');

   constructor(private translate: TranslateService) {
     translate.setTranslation('en', translationsEN);
    translate.setTranslation('pt', translationsPT);
    translate.use('pt'); //idioma padrão ao iniciar
    translate.setFallbackLang('pt');
  }
}
