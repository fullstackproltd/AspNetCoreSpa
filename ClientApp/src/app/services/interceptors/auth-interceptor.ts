import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AccountService } from '../account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private inj: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const auth = this.inj.get(AccountService);

        const authHeader = auth.accessToken;
        // Clone the request to add the new header.

        // const authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
        // OR shortcut
        const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authHeader } });
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }
}
