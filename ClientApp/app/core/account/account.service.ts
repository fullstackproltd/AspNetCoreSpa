import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register-model';
import { Response, Http } from '@angular/http';

import { LoginModel } from '../models/login-model';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store';
import { LoggedInActions } from '../auth-store/logged-in.actions';
import { AuthTokenActions } from '../auth-token/auth-token.actions';
import { ProfileActions } from '../profile/profile.actions';
import { UtilityService } from '../../core/services/utility.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {

    constructor(
        private http: Http,
        private authTokens: AuthTokenService,
        private store: Store<AppState>,
        private loggedInAction: LoggedInActions,
        private authTokenActions: AuthTokenActions,
        private profileActions: ProfileActions,
        private utilityService: UtilityService
    ) { }

    public register(data: RegisterModel): Observable<Response> {
        return this.http.post('api/account/register', data)
            .catch(res => Observable.throw(res.json()));
    }

    public login(user: LoginModel) {
        return this.authTokens.getTokens(user, 'password')
            .catch(res => Observable.throw(res.json()))
            .do(res => this.authTokens.scheduleRefresh());
    }

    public logout() {
        this.authTokens.deleteTokens();
        this.authTokens.unsubscribeRefresh();

        this.store.dispatch(this.loggedInAction.notLoggedIn());
        this.store.dispatch(this.authTokenActions.delete());
        this.store.dispatch(this.profileActions.delete());

        this.utilityService.navigateToSignIn();
    }

}
