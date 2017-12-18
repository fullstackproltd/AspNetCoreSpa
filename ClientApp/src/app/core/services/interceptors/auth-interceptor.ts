import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { AccountService } from '../account.service';
import { COOKIES } from '../../../app.models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private inj: Injector,
        @Inject(PLATFORM_ID) private platformId
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const auth = this.inj.get(AccountService);

        const authHeader = auth.accessToken;
        // Clone the request to add the new header.

        const authReq = req.clone({ headers: req.headers.set('Cookie', this.getCultureCookie()) });
        // OR shortcut
        // const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authHeader } });
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }

    private getCultureCookie(): string {
        if (isPlatformServer(this.platformId)) {
            const cookies: any = this.inj.get(COOKIES);
            let strCookie = '';
            if (cookies) {
                cookies.forEach((c: any) => {
                    strCookie += c.value;
                });
            }
            return '.AspNetCore.Culture=' + encodeURIComponent(strCookie);
        }
    }
}
