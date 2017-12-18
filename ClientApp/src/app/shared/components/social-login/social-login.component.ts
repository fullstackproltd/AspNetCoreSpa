import { Component, Input } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { AppService } from '../../../app.service';

@Component({
    selector: 'appc-social-login',
    styleUrls: ['./social-login.component.scss'],
    templateUrl: './social-login.component.html'
})
export class SocialLoginComponent {
    @Input() activeLogins: ISocialLogins[];
    constructor(
        private appService: AppService,
        private oAuthService: OAuthService,

    ) { }

    public get socialLogins(): ISocialLogins[] {
        return [...this.appService.appData.loginProviders].map(login => {
            return {
                loginProvider: login,
                providerKey: login,
                providerDisplayName: login,
                active: this.activeLogins && this.isActive(login)
            };
        });
    }
    public loginCss(login: string): string {
        if (login.toLowerCase() === 'microsoft') {
            return 'fa-windows';
        }

        if (login.toLowerCase() === 'stackexchange') {
            return 'fa-stack-exchange';
        }

        return `fa-${login.toLowerCase()}`;
    }
    public redirect(provider: string): void {
        this.oAuthService.initImplicitFlow(null, { provider: provider });
    }

    isActive(login: string): boolean {
        return this.activeLogins.some(l => l.loginProvider === login);
    }
}
