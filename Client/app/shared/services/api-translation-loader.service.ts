import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from 'ng2-translate/ng2-translate';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from 'ng2-translate/ng2-translate';

import { ContentService } from './content.service';

@Injectable()
export class ApiTranslationLoader implements TranslateLoader {

    constructor(public cs: ContentService) { }

    public getTranslation(lang: string): Observable<any> {
        return this.cs.get(lang);
    }
}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class CustomMissingTranslationHandler implements MissingTranslationHandler {
    public handle(params: MissingTranslationHandlerParams) {
        return params.key;
    }
}
