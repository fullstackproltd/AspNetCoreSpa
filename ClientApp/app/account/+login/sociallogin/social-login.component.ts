import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { GlobalRef } from '@app/core';

@Component({
    selector: 'appc-social-login',
    styleUrls: ['./social-login.component.scss'],
    templateUrl: './social-login.component.html'
})
export class SocialLoginComponent {
    constructor(private oAuthService: OAuthService, private globalRef: GlobalRef) { }

    public get socialLogins(): string[] {
        return this.globalRef.nativeGlobal.appData.loginProviders;
    }
    public redirect(provider: string): void {
        this.oAuthService.initImplicitFlow(null, { provider: provider });
    }

}
