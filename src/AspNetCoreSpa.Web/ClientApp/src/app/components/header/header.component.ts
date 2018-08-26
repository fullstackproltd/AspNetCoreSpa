import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

import { AppService } from '../../app.service';
import { AccountService, DataService } from '../../core';
import { User } from 'oidc-client';

@Component({
    selector: 'appc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public isCollapsed = true;
    constructor(
        private accountService: AccountService,
        private dataService: DataService,
        private appService: AppService,
        private oAuthService: OAuthService,
        private router: Router
    ) { }

    public get isLoggedIn(): boolean {
        return this.accountService.isLoggedIn();
    }
    public get user(): User {
        return this.accountService.user;

    }
    public get cultures(): ICulture[] {
        return this.appService.appData.cultures;
    }
    public get currentCulture(): ICulture {
        return this.cultures.filter(x => x.current)[0];
    }
    public ngOnInit(): void { }

    public toggleNav() {
        this.isCollapsed = !this.isCollapsed;
    }

    public logout() {
        this.dataService.post('api/account/logout').subscribe(() => {
            this.oAuthService.logOut();
            this.router.navigate(['/login']);
        });
    }

    public loginSts() {
        this.accountService.login();
    }
}
