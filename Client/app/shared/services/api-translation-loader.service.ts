import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

import { ContentService } from './content.service';

@Injectable()
export class ApiTranslationLoader implements TranslateLoader {

    constructor(public contentService: ContentService) { }

    public getTranslation(lang: string): Observable<any> {
        return this.contentService.get(lang);
    }
}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class CustomMissingTranslationHandler implements MissingTranslationHandler {
    public handle(params: MissingTranslationHandlerParams) {
        return params.key;
    }
}
