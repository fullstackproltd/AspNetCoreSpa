import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Params, ActivatedRoute, Router } from '@angular/router';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

import { routerTransition } from './router.animations';
import { ExternalLoginStatus } from './app.models';

@Component({
  selector: 'appc-root',
  animations: [routerTransition],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  appData: IApplicationConfig;

  constructor(
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject(PLATFORM_ID) private platformId: string,
    private activatedRoute: ActivatedRoute,
    private oauthService: OAuthService,
  ) {

    if (isPlatformBrowser(this.platformId)) {
      this.configureOidc();
    }

  }

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
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

  public getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

  private configureOidc() {
    this.oauthService.configure(authConfig(this.baseUrl));
    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

}
