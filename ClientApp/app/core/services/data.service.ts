﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UtilityService } from './utility.service';

@Injectable()
export class DataService {

    // Define the internal Subject we'll use to push the command count
    public pendingCommandsSubject = new Subject<number>();
    public pendingCommandCount = 0;

    // Provide the *public* Observable that clients can subscribe to
    public pendingCommands$: Observable<number>;

    constructor(public http: HttpClient, public us: UtilityService) {
        this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
    }

    public getImage(url: string): Observable<any> {
        return Observable.create((observer: any) => {
            const req = new XMLHttpRequest();
            req.open('get', url);
            req.onreadystatechange = function () {
                if (req.readyState === 4 && req.status === 200) {
                    observer.next(req.response);
                    observer.complete();
                }
            };
            req.setRequestHeader('Authorization', this.bearerToken);
            req.send();
        });
    }

    public get<T>(url: string, params?: any): Observable<T> {
        return this.http.get<T>(url, { params: this.buildUrlSearchParams(params) });
    }

    public getFull<T>(url: string): Observable<HttpResponse<T>> {
        return this.http.get<T>(url, { observe: 'response' });
    }

    public post<T>(url: string, data?: any, params?: any): Observable<T> {
        return this.http.post<T>(url, data);
    }

    public put<T>(url: string, data?: any, params?: any): Observable<T> {
        return this.http.put<T>(url, data);
    }

    public delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(url);
    }

    private get bearerToken(): string {
        const token = JSON.parse(<any>sessionStorage.getItem('auth-token'));
        if (token) {
            return 'Bearer ' + token.access_token;
        }
        return '';
    }

    private buildUrlSearchParams(params: any): HttpParams {
        const searchParams = new HttpParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                searchParams.append(key, params[key]);
            }
        }
        return searchParams;
    }

}
