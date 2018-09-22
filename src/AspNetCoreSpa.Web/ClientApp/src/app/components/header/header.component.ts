import { Component, OnInit } from '@angular/core';
import { User } from 'oidc-client';

import { AppService, AuthService } from '@app/services';

import { routes } from '../../+examples/examples.routes';

@Component({
    selector: 'appc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isCollapsed = true;

    exampleRoutes = [...routes];

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

    toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
    }
    login() {
        this.authService.login();
    }
    register() {
        this.authService.register();
    }
    profile() {
        this.authService.profile();
    }
    logout() {
        this.authService.logout();
    }
}
