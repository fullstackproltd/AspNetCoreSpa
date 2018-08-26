import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';
import { UserManager, User, WebStorageStateStore, Log } from 'oidc-client';

// import { decode } from './jwt-decode';
import { Constants } from '../../Constants';

@Injectable()
export class AccountService {
    private userManager: UserManager;
    user: User;
    constructor(private oAuthService: OAuthService, @Inject(PLATFORM_ID) private platformId: string) {
        Log.logger = console;
        console.log(Constants.clientRoot);
        const config = {
            authority: Constants.stsAuthority,
            client_id: Constants.clientId,
            redirect_uri: `${Constants.clientRoot}oidc-login-redirect.html`,
            scope: 'openid projects-api profile',
            response_type: 'id_token token',
            post_logout_redirect_uri: `${Constants.clientRoot}?postLogout=true`,
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            automaticSilentRenew: true,
            silent_redirect_uri: `${Constants.clientRoot}silent-redirect.html`
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
    }

    logout(): Promise<any> {
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

    // Old methods
    // public get isLoggedIn(): boolean {
    //     return isPlatformBrowser(this.platformId) &&
    //         this.oAuthService.hasValidAccessToken();
    // }
    // public get user(): IProfileModel | undefined {
    //     if (isPlatformBrowser(this.platformId) && this.idToken) {
    //         return decode(this.idToken);
    //     }
    //     return undefined;
    // }
    public get accessToken(): string {
        if (isPlatformBrowser(this.platformId)) {
            return this.oAuthService.getAccessToken();
        }
        return '';
    }
    // Used to access user information
    public get idToken(): string {
        return this.oAuthService.getIdToken();
    }
}
