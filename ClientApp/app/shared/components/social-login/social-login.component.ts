import { Component, Input } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { GlobalRef } from '@app/core';

@Component({
    selector: 'appc-social-login',
    styleUrls: ['./social-login.component.scss'],
    templateUrl: './social-login.component.html'
})
export class SocialLoginComponent {
    @Input() activeLogins: ISocialLogins[];
    constructor(private oAuthService: OAuthService, private globalRef: GlobalRef) { }

    public get socialLogins(): ISocialLogins[] {
        return [...this.globalRef.nativeGlobal.appData.loginProviders].map(login => {
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

        return `fa-${login.toLowerCase()}`;
    }
    public redirect(provider: string): void {
        this.oAuthService.initImplicitFlow(null, { provider: provider });
    }

    isActive(login: string): boolean {
        return this.activeLogins.some(l => l.loginProvider === login);
    }
}
