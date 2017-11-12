import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'appc-social-login',
    styleUrls: ['./social-login.component.scss'],
    templateUrl: './social-login.component.html'
})
export class SocialLoginComponent {
    constructor(private oAuthService: OAuthService) { }

    public redirect(provider: string): void {
        this.oAuthService.initImplicitFlow(null, { provider: provider });
    }

}
