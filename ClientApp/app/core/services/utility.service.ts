import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

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

    public parseQueryString(queryString: string) {
        // example
        // tslint:disable-next-line:max-line-length
        // var query = 'resource=resource_server&token_type=Bearer&access_token=CfDJ8MbGfXTNdiFIk1nMkGjAnbrAFAQ-Y9IoX0dpKgLKsJX2KgteDPde_VhHGtFiqkvZ9XPcQJr_9bjTEFDtVpKkWpBjCTKNmQF0fqaLQAl-sRRPlZuWesMlWcTzav_VmKXNdk8cuuFx2MIjodae3NJpzFl0BOCA2c4r97PD4mXehAxXKFpeztCLIhcoGQUjH08kvlkkJ3YsoOs_rqWARKn1IEK7iJU2eMDMCaH_UIMv0Uey31gB0C-VKOqpt7V9K30UJ4-HtBXAy1wRkk9J8hxfIwZnlgvJuPLeXW5vvVhtMv5gNNskcR-C6teiqkqczaKfwo9OAbNhWDslHTfuHTHNfbWnewzsqIoacgdJX0MC-vxhXaF94QDM5vuTx5jpNf8L7hOVYAaywMafI2SCb8hTx-XEgCZMXd8wqXkyy3uFuMt1_J3OrpmFEF4-i2PuFShDdaC9bGXC4519jgfIuRVhsb5Mr7MNd_2DBSgzDGW10hR6g7WtHZCMj_0-AxsfDmCKoVy6y_VKGYkCuVyZYMf2e_Zso1ESSB57Ecc7xvXm9QYnH4o90ag7SFnOM4ri92t-sWpAaST4FnBtLcl-4ljZwhE&expires_in=3600&id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IlRTOEdZOFNIR0ZTQ0VDXzRQS0JQSF9JRU1NWERMVlFTSE5XR0pUTzgiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiIzIiwibmFtZSI6ImFAcy5jb20iLCJ0b2tlbl91c2FnZSI6ImlkX3Rva2VuIiwianRpIjoiYTg3ZDRmNTItOGJhYS00MzEwLWFlNzAtYTE5Mzg2ZWE4NTViIiwiYXVkIjoiYXNwbmV0Y29yZXNwYSIsIm5vbmNlIjoidGVzdCIsImF0X2hhc2giOiJudkYyYVZTaDhXOERTZ25sRmdZQ2VnIiwiYXpwIjoiYXNwbmV0Y29yZXNwYSIsIm5iZiI6MTUxMDE4MDA2NCwiZXhwIjoxNTEwMTgxMjY0LCJpYXQiOjE1MTAxODAwNjQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8ifQ.lp7s1SA4m1SePiDInZ52RV5CujM2_Qq-l20XMFW-78tHpVlaxdhV2AA8NYDhBV6lDaPnMsUEVoPv0GwDsbYwqDfuAI3uZb6uxGow6F_zs8WK6A6U7B-CCWI-i16H0rOVfSrmk3FGK-YLku6DeUQTF90DStj7QSXLJVShy8uDpDXmySSdAHJT-8r-jzDjEfqhEXu12M11KcXUMqpEAlpSs-0lRS6PhsCBBpLyYOFhglGm32K9FlIu6dV8_hiiYJ3HTyB7PGb85xf_sR-pHtqlB1wPYf_bicYZ9ENYoEJPcjq_4vuDWvWUph1mFfa4AHoOm7ynq9XcdihInMgd2G_lzA';
        const query: any = {};
        const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
    }
    // Detect if library loaded
    private isLoadedScript(lib: string) {
        return document.querySelectorAll('[src="' + lib + '"]').length > 0;
    }

    private isLoadedStyle(lib: string) {
        return document.querySelectorAll('[href="' + lib + '"]').length > 0;
    }


}
