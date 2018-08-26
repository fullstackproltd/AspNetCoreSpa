import { Component, OnInit } from '@angular/core';
import { User } from 'oidc-client';

import { AppService } from '../../app.service';
import { AuthService } from '../../core';

@Component({
    selector: 'appc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isCollapsed = true;
    constructor(
        private authService: AuthService,
        private appService: AppService
    ) { }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }
    get user(): User {
        return this.authService.user;

    }
    get cultures(): ICulture[] {
        return this.appService.appData.cultures;
    }
    get currentCulture(): ICulture {
        return this.cultures.filter(x => x.current)[0];
    }
    ngOnInit(): void { }

    toggleNav() {
        this.isCollapsed = !this.isCollapsed;
    }
    login() {
        this.authService.login();
    }
    logout() {
        this.authService.logout();
    }
}
