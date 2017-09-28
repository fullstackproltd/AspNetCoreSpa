import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../core/services/account.service';
import { ProfileModel } from '../../core/models/profile-model';

@Component({
    selector: 'appc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public isCollapsed = true;
    public languages = [
        { locale: 'en', description: 'English' },
        { locale: 'fr', description: 'French' }
    ];
    public currentLanguage = this.languages[0];

    constructor(
        public accountService: AccountService,
        public translation: TranslateService
    ) { }

    public get isLoggedIn(): boolean {
        return this.accountService.isLoggedIn;
    }
    public get user(): ProfileModel | undefined {
        return this.accountService.user;

    }

    public ngOnInit(): void { }

    public toggleNav() {
        this.isCollapsed = !this.isCollapsed;
    }

    public setLang(lang: any) {
        this.currentLanguage = lang;
        this.translation.use(lang.locale);
    }
}
