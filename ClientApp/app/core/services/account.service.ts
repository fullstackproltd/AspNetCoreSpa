import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register-model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { LoginModel } from '../models/login-model';
import { UtilityService } from '../../core/services/utility.service';
import { Observable } from 'rxjs/Observable';
import { AuthTokenModel } from '../models/auth-tokens-model';
import { JwtHelper } from 'angular2-jwt';
import { ProfileModel } from '../models/profile-model';

@Injectable()
export class AccountService {
    private tokenKey = 'auth-token';
    public jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: HttpClient, private utilityService: UtilityService) { }

    public get isLoggedIn(): boolean {
        if (this.accessToken) {
            return !this.jwtHelper.isTokenExpired(this.accessToken);
        }
        return false;
    }
    public get user(): ProfileModel | undefined {
        if (this.accessToken) {
            return this.jwtHelper.decodeToken(this.accessToken);
        }
        return undefined;
    }

    public login(user: LoginModel): Observable<any> {
        // data can be any since it can either be a refresh tokens or login details
        // The request for tokens must be x-www-form-urlencoded
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = { headers };
        Object.assign(user, {
            grant_type: 'password',
            // offline_access is required for a refresh token
            scope: ['openid offline_access client_id profile email roles']
        });

        return this.http.post('/connect/token', this.encodeObjectToParams(user), options)
            .map((tokens: AuthTokenModel) => {
                const now = new Date();
                tokens.expiration_date = new Date(now.getTime() + (tokens.expires_in ? (tokens.expires_in * 1000) : 0)).getTime().toString();

                // const profile = this.jwtHelper.decodeToken(tokens.id_token ? tokens.id_token : '') as ProfileModel;

                localStorage.setItem(this.tokenKey, JSON.stringify(tokens));
            });
    }
    public register(data: RegisterModel): Observable<any> {
        return this.http.post('api/account/register', data);
    }
    public create(email: string): Observable<any> {
        return this.http.post('api/account/externallogincreateaccount', { email });
    }
    public logout() {
        localStorage.removeItem(this.tokenKey);
        this.utilityService.navigateToSignIn();
    }

    public get accessToken(): string {
        let token = '';
        const ticket = localStorage.getItem(this.tokenKey);
        if (ticket) {
            token = JSON.parse(<any>ticket).id_token;
        }
        return token;
    }

    private encodeObjectToParams(obj: any): string {
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }
}
