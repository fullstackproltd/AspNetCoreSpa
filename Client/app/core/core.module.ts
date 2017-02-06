import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthTokenService } from './auth-token/auth-token.service';
import { AccountService } from './account/account.service';
import { LoggedInActions } from './auth-store/logged-in.actions';
import { ProfileActions } from './profile/profile.actions';
import { AuthTokenActions } from './auth-token/auth-token.actions';
import { AuthReadyActions } from './auth-store/auth-ready.actions';

@NgModule({
    providers: [
        Title,
        AuthTokenService,
        AccountService,
        LoggedInActions,
        ProfileActions,
        AuthTokenActions,
        AuthReadyActions,
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
