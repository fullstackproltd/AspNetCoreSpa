import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

abstract class HttpCache {
    /**
     * Returns a cached response, if any, or null if not present.
     */
    abstract get(req: HttpRequest<any>): HttpResponse<any> | null;

    /**
     * Adds or updates the response in the cache.
     */
    abstract put(req: HttpRequest<any>, resp: HttpResponse<any>): void;
}

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(private cache: HttpCache) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Before doing anything, it's important to only cache GET requests.
        // Skip this interceptor if the request method isn't GET.
        if (req.method !== 'GET') {
            return next.handle(req);
        }

        // First, check the cache to see if this request exists.
        const cachedResponse = this.cache.get(req);
        if (cachedResponse) {
            // A cached response exists. Serve it instead of forwarding
            // the request to the next handler.
            return Observable.of(cachedResponse);
        }

        // No cached response exists. Go to the network, and cache
        // the response when it arrives.
        return next.handle(req).do(event => {
            // Remember, there may be other events besides just the response.
            if (event instanceof HttpResponse) {
                // Update the cache.
                this.cache.put(req, event);
            }
        });
    }
}
