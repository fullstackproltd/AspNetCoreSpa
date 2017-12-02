import { Injectable, PLATFORM_ID } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwtHelper } from 'angular2-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AccountService {
    public jwtHelper: JwtHelper = isPlatformBrowser(PLATFORM_ID) && new JwtHelper();

    constructor(private oAuthService: OAuthService) { }

    public get isLoggedIn(): boolean {
        return this.oAuthService.hasValidAccessToken();
    }
    public get user(): IProfileModel | undefined {
        if (this.idToken) {
            return this.jwtHelper.decodeToken(this.idToken);
        }
        return undefined;
    }
    public get accessToken(): string {
        if (isPlatformBrowser(PLATFORM_ID)) {
            return this.oAuthService.getAccessToken();
        }
    }
    // Used to access user information
    public get idToken(): string {
        if (isPlatformBrowser(PLATFORM_ID)) {
            return this.oAuthService.getIdToken();
        }
    }
}
