import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../app.service';

@Component({
    selector: 'appc-cookie-consent',
    styleUrls: ['./cookie-consent.component.scss'],
    templateUrl: './cookie-consent.component.html'
})
export class CookieConsentComponent {
    constructor(
        private appService: AppService,
        private router: Router
    ) { }

    public get cookieConsent(): ICookieConsent {
        return this.appService.appData.cookieConsent;
    }

    accept() {
        document.cookie = this.cookieConsent.cookieString;
        this.cookieConsent.showConsent = false;
    }

    gotoPrivacy() {
        this.accept();
        this.router.navigate(['privacy']);
    }
}
