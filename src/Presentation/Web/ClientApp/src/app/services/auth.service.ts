import { Injectable } from '@angular/core';
import { UserManager, User, WebStorageStateStore, Log, UserManagerSettings } from 'oidc-client';

@Injectable()
export class AuthService {
    private userManager: UserManager;
    user: User;
    constructor() {
        Log.logger = console;
    }

    login(): Promise<any> {
        return this.userManager.signinRedirect();

        // this.dataService.post(this.userManager.settings.authority + '/connect/token', {
        //     grant_type: 'password',
        //     scope: 'openid profile aspnetcorespa-api offline_access roles',
        //     username: 'admin@admin.com',
        //     password: 'P@ssw0rd!',
        //     client_id: 'spa-client'
        // }).subscribe(res => {
        //     console.log(res);
        // });
    }

    register() {
        location.href = `${this.userManager.settings.authority}/account/register?returnUrl=${location.href}`;
    }
    profile() {
        location.href = `${this.userManager.settings.authority}/manage/index`;
    }
    logout(): any {
        return this.userManager.signoutRedirect();
    }

    isLoggedIn(): boolean {
        return this.user && this.user.access_token && !this.user.expired;
    }

    getAccessToken(): string {
        return this.user ? this.user.access_token : '';
    }

    signoutRedirectCallback(): Promise<any> {
        return this.userManager.signoutRedirectCallback();
    }

    setupUserManager(stsAuthroity: string) {
        const config: UserManagerSettings = {
            authority: stsAuthroity,
            client_id: 'spa-client',
            redirect_uri: `${location.origin}/login-redirect.html`,
            scope: 'openid spa-api profile offline_access',
            response_type: 'id_token token',
            client_secret: 'srcret',
            post_logout_redirect_uri: `${location.origin}?postLogout=true`,
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            automaticSilentRenew: true,
            silent_redirect_uri: `${location.origin}/silent-renew.html`
        };
        this.userManager = new UserManager(config);
        this.userManager.getUser().then(user => {
            if (user && !user.expired) {
                this.user = user;
                // this.loadSecurityContext();
            }
        });
        this.userManager.events.addUserLoaded(args => {
            this.userManager.getUser().then(user => {
                this.user = user;
                // this.loadSecurityContext();
            });
        });
    }
}
