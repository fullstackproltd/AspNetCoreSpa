import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'appc-social-login',
    styleUrls: ['./social-login.component.scss'],
    templateUrl: './social-login.component.html'
})
export class SocialLoginComponent {
    constructor(private oAuthService: OAuthService) { }

    public loginGoogle(): void {
        this.redirect('Google');
    }

    public loginFacebook(): void {
        this.redirect('Facebook');
    }

    public loginMicrosoft(): void {
        this.redirect('Microsoft');
    }

    public loginTwitter(): void {
        this.redirect('Twitter');
    }

    public loginGithub(): void {
        this.redirect('GitHub');
    }

    public loginLinkedIn(): void {
        this.redirect('LinkedIn');
    }

    public redirect(provider: string): void {
        this.oAuthService.initImplicitFlow(null, { provider: provider });
    }

}
