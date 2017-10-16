import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'appc-social-login',
    styleUrls: ['./social-login.component.scss'],
    templateUrl: './social-login.component.html'
})
export class SocialLoginComponent {
    constructor(public location: Location) { }

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
        const url = window.location.protocol + '//' + window.location.host + '/api/account/ExternalLogin?provider=' + provider;
        console.log(url);
        window.location.href = url;
    }

}
