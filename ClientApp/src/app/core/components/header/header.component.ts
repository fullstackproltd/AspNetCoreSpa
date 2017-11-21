import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../services/account.service';
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
    constructor(public accountService: AccountService, private globalRef: GlobalRef) { }

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



}
