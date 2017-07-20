import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../app-store';
import { ProfileModel } from '../models/profile-model';
import { LoginModel } from '../models/login-model';
import { LoggedInActions } from '../auth-store/logged-in.actions';
import { AuthTokenActions } from './auth-token.actions';
import { AuthReadyActions } from '../auth-store/auth-ready.actions';
import { ProfileActions } from '../profile/profile.actions';
import { RefreshGrantModel } from '../models/refresh-grant-model';
import { AuthTokenModel } from '../models/auth-tokens-model';

@Injectable()
export class AuthTokenService {
    public refreshSubscription$: Subscription;
    public jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        private http: Http,
        private store: Store<AppState>,
        private loggedInActions: LoggedInActions,
        private authTokenActions: AuthTokenActions,
        private authReadyActions: AuthReadyActions,
        private profileActions: ProfileActions
    ) { }

    public getTokens(data: LoginModel | RefreshGrantModel, grantType: string): Observable<void> {
        // data can be any since it can either be a refresh tokens or login details
        // The request for tokens must be x-www-form-urlencoded
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers });

        Object.assign(data, {
            grant_type: grantType,
            // offline_access is required for a refresh token
            scope: ['openid offline_access']
        });

        return this.http.post('/connect/token', this.encodeObjectToParams(data), options)
            .map(res => res.json())
            .map((tokens: AuthTokenModel) => {
                const now = new Date();
                tokens.expiration_date = new Date(now.getTime() + (tokens.expires_in ? (tokens.expires_in * 1000) : 0)).getTime().toString();

                this.store.dispatch(this.authTokenActions.load(tokens));
                this.store.dispatch(this.loggedInActions.loggedIn());

                const profile = this.jwtHelper.decodeToken(tokens.id_token ? tokens.id_token : '') as ProfileModel;
                this.store.dispatch(this.profileActions.load(profile));

                localStorage.setItem('auth-tokens', JSON.stringify(tokens));
                this.store.dispatch(this.authReadyActions.ready());
            });

    }

    public deleteTokens() {
        localStorage.removeItem('auth-tokens');
        this.store.dispatch(this.authTokenActions.delete());
    }

    public unsubscribeRefresh() {
        if (this.refreshSubscription$) {
            this.refreshSubscription$.unsubscribe();
        }
    }

    public refreshTokens(): Observable<Response> {
        return this.store.select(state => state.auth.authTokens)
            .first()
            .flatMap((tokens: any) => {
                return this.getTokens({ refresh_token: tokens.refresh_token }, 'refresh_token')
                    // This should only happen if the refresh token has expired
                    .catch((error: any) => {
                        // let the app know that we cant refresh the token
                        // which means something is invalid and they aren't logged in
                        this.loggedInActions.notLoggedIn();
                        return Observable.throw('Session Expired');
                    });
            });
    }

    public startupTokenRefresh() {
        const tokensString = localStorage.getItem('auth-tokens');
        const tokensModel = tokensString === null ? null : JSON.parse(tokensString);
        return Observable.of(tokensModel)
            .flatMap(tokens => {
                // check if the token is even if localStorage, if it isn't tell them it's not and return
                if (!tokens) {
                    this.store.dispatch(this.authReadyActions.ready());
                    return Observable.throw('No token in Storage');
                }
                this.store.dispatch(this.authTokenActions.load(tokens));

                // the "+" below is to convert "tokens.expiration_date" to a number so we can compare
                if (+tokens.expiration_date > new Date().getTime()) {
                    // grab the profile out so we can store it
                    const profile: ProfileModel = this.jwtHelper.decodeToken(tokens.id_token);
                    this.store.dispatch(this.profileActions.load(profile));

                    // we can let the app know that we're good to go ahead of time
                    this.store.dispatch(this.loggedInActions.loggedIn());
                    this.store.dispatch(this.authReadyActions.ready());
                }

                return this.refreshTokens()
                    .map(() => {
                        this.scheduleRefresh();
                    });
            })
            .catch(error => {
                this.store.dispatch(this.loggedInActions.notLoggedIn());
                this.store.dispatch(this.authReadyActions.ready());
                return Observable.throw(error);
            });
    }

    public scheduleRefresh(): void {
        const source = this.store.select(state => state.auth.authTokens)
            .take(1)
            .flatMap((tokens: AuthTokenModel) => {
                // the interval is how long inbetween token refreshes
                // here we are taking half of the time it takes to expired
                // you may want to change how this time interval is calculated
                const interval = tokens.expires_in ? (tokens.expires_in / 2 * 1000) : 0;
                return Observable.interval(interval);
            });

        this.refreshSubscription$ = source.subscribe(() => {
            this.refreshTokens()
                .subscribe();
        });
    }

    private encodeObjectToParams(obj: any): string {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }

}
