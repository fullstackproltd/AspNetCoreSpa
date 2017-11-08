import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { routerTransition } from './router.animations';
import { ExternalLoginStatus } from './app.models';
import { UtilityService, AccountService } from './core';

@Component({
  selector: 'appc-root',
  animations: [routerTransition],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    public titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private us: UtilityService,
    private as: AccountService) {
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

    this.route.queryParams.subscribe((params: Params) => {
      this.as.setToken(this.us.parseQueryString(window.location.href.split('#')[1]));
      const param = params['externalLoginStatus'];
      if (param) {
        const status = <ExternalLoginStatus>+param;
        switch (status) {
          case ExternalLoginStatus.CreateAccount:
            this.router.navigate(['createaccount']);
            break;

          default:
            break;
        }
      }
    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

}
