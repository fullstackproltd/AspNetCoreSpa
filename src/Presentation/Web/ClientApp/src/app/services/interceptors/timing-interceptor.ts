import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        return next
            .handle(req)
            .pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log(`%c ${req.method}-${req.urlWithParams}%c - ${elapsed} ms.`, 'color: blue;', 'font-weight:bold;');
                }
            }));
    }
}
