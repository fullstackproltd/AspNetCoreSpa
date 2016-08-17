import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({
    selector: 'appc-social-login',
    styleUrls: ['./social-login.component.scss'],
    templateUrl: './social-login.component.html'
})
export class SocialLoginComponent implements OnInit {
    constructor(private location: Location) { }

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
        let url = window.location.protocol + '//' + window.location.host + '/api/account/ExternalLogin?provider=' + provider;
        console.log(url);
        window.location.href = url;
    }

}
