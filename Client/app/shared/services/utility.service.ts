import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UtilityService {
    public _router: Router;

    constructor(router: Router) {
        this._router = router;
    }

    public convertDateTime(date: Date) {
        const _formattedDate = new Date(date.toString());
        return _formattedDate.toDateString();
    }

    public navigate(path: string) {
        this._router.navigate([path]);
    }

    public navigateToSignIn() {
        this.navigate('/login');
    }

    public getParams() {
        const searchParams = window.location.search.split('?')[1];
        if (searchParams) {
            const paramsObj: any = {};

            searchParams.split('&').forEach(i => {
                paramsObj[i.split('=')[0]] = i.split('=')[1];
            });
            return paramsObj;
        }
        return undefined;
    }
    public readableColumnName(columnName: string): string {
        // Convert underscores to spaces
        if (typeof (columnName) === 'undefined' || columnName === undefined || columnName === null) { return columnName; }

        if (typeof (columnName) !== 'string') {
            columnName = String(columnName);
        }

        return columnName.replace(/_+/g, ' ')
            // Replace a completely all-capsed word with a first-letter-capitalized version
            .replace(/^[A-Z]+$/, (match) => {
                return ((match.charAt(0)).toUpperCase() + match.slice(1)).toLowerCase();
            })
            // Capitalize the first letter of words
            .replace(/([\w\u00C0-\u017F]+)/g, (match) => {
                return (match.charAt(0)).toUpperCase() + match.slice(1);
            })
            // Put a space in between words that have partial capilizations (i.e. 'firstName' becomes 'First Name')
            // .replace(/([A-Z]|[A-Z]\w+)([A-Z])/g, "$1 $2");
            // .replace(/(\w+?|\w)([A-Z])/g, "$1 $2");
            .replace(/(\w+?(?=[A-Z]))/g, '$1 ');
    }

    public loadStyle(link: string): Observable<any> {
        if (this.isLoadedStyle(link)) {
            return Observable.of('');
        } else {
            const head = document.getElementsByTagName('head')[0];
            // Load jquery Ui
            const styleNode = document.createElement('link');
            styleNode.rel = 'stylesheet';
            styleNode.type = 'text/css';
            styleNode.href = link;
            styleNode.media = 'all';
            head.appendChild(styleNode);
            return Observable.fromEvent(styleNode, 'load');
        }
    }
    public loadScript(script: string): Observable<any> {
        if (this.isLoadedScript(script)) {
            return Observable.of('');
        } else {
            const head = document.getElementsByTagName('head')[0];
            // Load jquery Ui
            const scriptNode = document.createElement('script');
            scriptNode.src = script;
            scriptNode.async = false;
            // scriptNode.type = 'text/javascript';
            // scriptNode.charset = 'utf-8';
            head.insertBefore(scriptNode, head.firstChild);
            return Observable.fromEvent(scriptNode, 'load');
        }
    }

    // Detect if library loaded
    private isLoadedScript(lib: string) {
        return document.querySelectorAll('[src="' + lib + '"]').length > 0;
    }

    private isLoadedStyle(lib: string) {
        return document.querySelectorAll('[href="' + lib + '"]').length > 0;
    }

}
