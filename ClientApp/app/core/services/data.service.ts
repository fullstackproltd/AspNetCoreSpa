import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { UtilityService } from './utility.service';
import { DataServiceOptions } from './data-service-options';
import { AuthTokenModel } from '../models/auth-tokens-model';

@Injectable()
export class DataService {

    // Define the internal Subject we'll use to push the command count
    public pendingCommandsSubject = new Subject<number>();
    public pendingCommandCount = 0;

    // Provide the *public* Observable that clients can subscribe to
    public pendingCommands$: Observable<number>;

    constructor(public http: HttpClient, public us: UtilityService, @Inject(PLATFORM_ID) private platformId: Object) {
        this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
    }

    // I perform a GET request to the API, appending the given params
    // as URL search parameters. Returns a stream.
    public get<T>(url: string, params?: any): Observable<T> {
        const options = new DataServiceOptions();
        options.method = RequestMethod.Get;
        options.url = url;
        options.params = params;
        return this.request<T>(options);
    }

    // I perform a POST request to the API. If both the params and data
    // are present, the params will be appended as URL search parameters
    // and the data will be serialized as a JSON payload. If only the
    // data is present, it will be serialized as a JSON payload. Returns
    // a stream.
    public post<T>(url: string, data?: any, params?: any): Observable<T> {
        if (!data) {
            data = params;
            params = {};
        }
        const options = new DataServiceOptions();
        options.method = RequestMethod.Post;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request<T>(options);
    }

    public put<T>(url: string, data?: any, params?: any): Observable<T> {
        if (!data) {
            data = params;
            params = {};
        }
        const options = new DataServiceOptions();
        options.method = RequestMethod.Put;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request<T>(options);
    }

    public delete<T>(url: string): Observable<T> {
        const options = new DataServiceOptions();
        options.method = RequestMethod.Delete;
        options.url = url;
        return this.request<T>(options);
    }

    public request<T>(options: DataServiceOptions): Observable<T> {
        options.method = (options.method || RequestMethod.Get);
        options.url = (options.url || '');
        options.headers = (options.headers || {});
        options.params = (options.params || {});
        options.data = (options.data || {});

        this.interpolateUrl(options);
        this.addContentType(options);
        // Client only code.
        // because it uses global window/documents stuff
        if (isPlatformBrowser(this.platformId)) {
            this.addXsrfToken(options);
            this.addAuthToken(options);
        }

        const requestOptions = {
            method: options.method,
            url: options.url,
            headers: options.headers,
            search: this.buildUrlSearchParams(options.params),
            body: JSON.stringify(options.data)
        }

        this.pendingCommandsSubject.next(++this.pendingCommandCount);

        const stream = this.http.request<T>(this.toMethodString(options.method), options.url, requestOptions)
            .catch((error: any) => {
                this.handleErrors(error);
                return Observable.throw(error);
            })
            // .map(this.unwrapHttpValue)
            .catch((error: any) => {
                return Observable.throw(this.unwrapHttpError(error));
            })
            .finally(() => {
                this.pendingCommandsSubject.next(--this.pendingCommandCount);
            });

        return stream;
    }

    private addContentType(options: DataServiceOptions): DataServiceOptions {
        // if (options.method !== RequestMethod.Get) {
        options.headers['Content-Type'] = 'application/json; charset=UTF-8';
        // }
        return options;
    }

    private addAuthToken(options: DataServiceOptions): DataServiceOptions {
        const authTokenString = localStorage.getItem('auth-token');
        if (authTokenString) {
            const authTokenModel: AuthTokenModel = JSON.parse(<any>authTokenString);
            // tslint:disable-next-line:whitespace
            options.headers.Authorization = 'Bearer ' + authTokenModel.access_token;
        }
        return options;
    }

    private extractValue(collection: any, key: string): any {
        const value = collection[key];
        delete (collection[key]);
        return value;
    }

    private addXsrfToken(options: DataServiceOptions): DataServiceOptions {
        const xsrfToken = this.getXsrfCookie();
        if (xsrfToken) {
            options.headers['X-XSRF-TOKEN'] = xsrfToken;
        }
        return options;
    }

    private getXsrfCookie(): string {
        const matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
        try {
            return matches ? decodeURIComponent(matches[1]) : '';
        } catch (decodeError) {
            return '';
        }
    }

    // private addCors(options: DataServiceOptions): DataServiceOptions {
    //     options.headers['Access-Control-Allow-Origin'] = '*';
    //     return options;
    // }

    private buildUrlSearchParams(params: any): URLSearchParams {
        const searchParams = new URLSearchParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                searchParams.append(key, params[key]);
            }
        }
        return searchParams;
    }

    private interpolateUrl(options: DataServiceOptions): DataServiceOptions {
        options.url = options.url.replace(/:([a-zA-Z]+[\w-]*)/g, ($0, token) => {
            // Try to move matching token from the params collection.
            if (options.params.hasOwnProperty(token)) {
                return (this.extractValue(options.params, token));
            }
            // Try to move matching token from the data collection.
            if (options.data.hasOwnProperty(token)) {
                return (this.extractValue(options.data, token));
            }
            // If a matching value couldn't be found, just replace
            // the token with the empty string.
            return ('');
        });
        // Clean up any repeating slashes.
        options.url = options.url.replace(/\/{2,}/g, '/');
        // Clean up any trailing slashes.
        options.url = options.url.replace(/\/+$/g, '');

        return options;
    }

    private unwrapHttpError(error: any): any {
        try {
            return (error.json());
        } catch (jsonError) {
            return ({
                code: -1,
                message: 'An unexpected error occurred.'
            });
        }
    }
    private handleErrors(error: any) {
        if (error.status === 401) {
            sessionStorage.clear();
            this.us.navigateToSignIn();
        } else if (error.status === 403) {
            // Forbidden
            this.us.navigateToSignIn();
        }
    }

    private toMethodString(method: RequestMethod): string {
        switch (method) {
            case RequestMethod.Get:
                return 'GET';
            case RequestMethod.Post:
                return 'POST';
            case RequestMethod.Put:
                return 'PUT';
            case RequestMethod.Delete:
                return 'DELETE';
            case RequestMethod.Patch:
                return 'PATCH';
            default:
                return 'GET';
        }
    }
}
