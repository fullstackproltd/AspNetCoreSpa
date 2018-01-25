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

        // Clone the request to add the new header.
        let headers = req.headers;
        if (isPlatformServer(this.platformId)) {
            headers = req.headers.set('Cookie', this.getCultureCookie());
        } else {
            headers = req.headers.set('Authorization', 'Bearer ' + auth.accessToken);
        }

        const authReq = req.clone({ headers });
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }

    private getCultureCookie(): string {
        const cookies: any[] = this.inj.get<any[]>(COOKIES);
        if (cookies) {
            const cultureCookie = cookies.find(c => c.key === '.AspNetCore.Culture');
            return '.AspNetCore.Culture=' + encodeURIComponent(cultureCookie.value);
        }
    }
}
