import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

@Injectable()
export class ApiTranslationLoader implements TranslateLoader {

    constructor() { }

    public getTranslation(lang: string): Observable<any> {
        return Observable.of(JSON.parse((<any>window).content));
    }
}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class CustomMissingTranslationHandler implements MissingTranslationHandler {
    public handle(params: MissingTranslationHandlerParams) {
        return params.key;
    }
}
