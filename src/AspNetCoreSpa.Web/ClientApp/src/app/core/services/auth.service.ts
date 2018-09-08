import { Injectable } from '@angular/core';
import { UserManager, User, WebStorageStateStore, Log, UserManagerSettings } from 'oidc-client';

import { Constants } from '../../Constants';

@Injectable()
export class AuthService {
    private userManager: UserManager;
    user: User;
    constructor() {
        console.log(location.origin);
        Log.logger = console;
        const config: UserManagerSettings = {
            authority: Constants.stsAuthority,
            client_id: 'spa-client',
            redirect_uri: `${location.origin}/login-redirect.html`,
            scope: 'openid aspnetcorespa-api profile offline_access',
            response_type: 'id_token token',
            post_logout_redirect_uri: `${location.origin}?postLogout=true`,
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            automaticSilentRenew: true,
            silent_redirect_uri: `${location.origin}/assets/silent-renew.html`
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

    login(): Promise<any> {
        return this.userManager.signinRedirect();

        // this.dataService.post(Constants.stsAuthority + '/connect/token', {
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
        location.href = `${Constants.stsAuthority}/account/register?returnUrl=${location.href}`;
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
}
