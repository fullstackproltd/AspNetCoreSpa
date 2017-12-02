import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { AccountService } from '../../services/account.service';
import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utitlity.service';
import { GlobalRef } from '../../../global-ref';

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
        private accountService: AccountService,
        private dataService: DataService,
        private oAuthService: OAuthService,
        private utilityService: UtilityService,
        private globalRef: GlobalRef
    ) { }

    public get isLoggedIn(): boolean {
        return this.accountService.isLoggedIn;
    }
    public get user(): IProfileModel | undefined {
        return this.accountService.user;

    }
    public get cultures(): ICulture[] {
        return this.globalRef.nativeGlobal.appData.cultures;
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
