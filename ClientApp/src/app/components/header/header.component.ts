import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import {
    AccountService,
    DataService,
    UtilityService,
} from '@app/services';

@Component({
    selector: 'appc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public notificationOptions = {
        position: ['top', 'right'],
        timeOut: 5000,
        lastOnBottom: true
    };
    public isCollapsed = true;
    constructor(
        public oAuthService: OAuthService,
        public dataService: DataService,
        public utilityService: UtilityService,
        public accountService: AccountService) { }

    public get isLoggedIn(): boolean {
        return this.accountService.isLoggedIn;
    }
    public get user(): IProfileModel | undefined {
        return this.accountService.user;

    }

    public get cultures(): ICulture[] {
        return []; // this.globalRef.nativeGlobal.appData.cultures;
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
            this.utilityService.navigateToSignIn();
        });
    }

}
