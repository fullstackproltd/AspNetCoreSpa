import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({
    selector: 'appc-social-login',
    styleUrls: ['./social-login.component.scss'],
    templateUrl: './social-login.component.html'
})
export class SocialLoginComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    loginGoogle(): void {
        this.redirect('Google');
    }

    loginFacebook(): void {
        this.redirect('Facebook');
    }

    loginMicrosoft(): void {
        this.redirect('Microsoft');
    }

    loginTwitter(): void {
        this.redirect('Twitter');
    }

    loginGithub(): void {
        this.redirect('GitHub');
    }

    loginLinkedIn(): void {
        this.redirect('LinkedIn');
    }

    redirect(provider: string): void {
        window.location.href = window.location.protocol + '//' + window.location.host + '/' + '/api/account/ExternalLogin?provider=' + provider;
    }

}
