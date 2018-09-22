import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private inj: Injector,
        @Inject(PLATFORM_ID) private platformId
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const auth = this.inj.get(AuthService);

        // Clone the request to add the new header.
        let headers = req.headers;
        if (isPlatformBrowser(this.platformId)) {
            headers = req.headers.set('Authorization', 'Bearer ' + auth.getAccessToken());
        }

        const authReq = req.clone({ headers });
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }
}
