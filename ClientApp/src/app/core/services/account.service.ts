import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';
import { decode } from './jwt-decode';

@Injectable()
export class AccountService {
    constructor(private oAuthService: OAuthService, @Inject(PLATFORM_ID) private platformId: string) { }

    public get isLoggedIn(): boolean {
        return isPlatformBrowser(this.platformId) &&
            this.oAuthService.hasValidAccessToken();
    }
    public get user(): IProfileModel | undefined {
        if (isPlatformBrowser(this.platformId) && this.idToken) {
            return decode(this.idToken);
        }
        return undefined;
    }
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
