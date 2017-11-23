import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { AccountService } from '../../services/account.service';
import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { ProfileModel } from '../../models/profile-model';
import { GlobalRef } from '../../../core/global-ref';

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
        public accountService: AccountService,
        private globalRef: GlobalRef) { }

    public get isLoggedIn(): boolean {
        return this.accountService.isLoggedIn;
    }
    public get user(): ProfileModel | undefined {
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
        this.dataService.post('api/account/logout').subscribe((res) => {
            this.oAuthService.logOut();
            this.utilityService.navigateToSignIn();
        });
    }

}
