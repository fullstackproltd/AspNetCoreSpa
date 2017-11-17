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

    public get socialLogins(): string[] {
        return [...this.globalRef.nativeGlobal.appData.loginProviders];
    }
    public loginCss(login: string): string {
        login = login.toLowerCase();
        if (login === 'microsoft') {
            login = 'windows';
        }

        return `fa-${login} ${this.activeClass(login)}`;
    }
    public redirect(provider: string): void {
        this.oAuthService.initImplicitFlow(null, { provider: provider });
    }

    private activeClass(login: string) {
        if (this.activeLogins) {
            const matchedLogin = this.activeLogins.filter(l => l.loginProvider.toLowerCase() === login);
            return matchedLogin && matchedLogin.length > 0 ? 'active' : '';
        }
        return '';
    }
}
