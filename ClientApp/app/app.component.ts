import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { routerTransition } from './router.animations';

@Component({
  selector: 'appc-root',
  animations: [routerTransition],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    public titleService: Title) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  public ngOnInit() {
    this.translate.onLangChange.subscribe((lan: string) => {
      this.translate.get('TITLE')
        .subscribe((title: string) => this.setTitle(title));
    });

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

}
