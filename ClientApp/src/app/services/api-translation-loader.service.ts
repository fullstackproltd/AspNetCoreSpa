import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { GlobalRef } from './global-ref';

@Injectable()
export class ApiTranslationLoader implements TranslateLoader {

    constructor(private globalRef: GlobalRef) { }

    public getTranslation(lang: string): Observable<StringMap[]> {
        return Observable.of(this.globalRef.nativeGlobal.appData.content);
    }
}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class CustomMissingTranslationHandler implements MissingTranslationHandler {
    public handle(params: MissingTranslationHandlerParams) {
        return params.key;
    }
}
