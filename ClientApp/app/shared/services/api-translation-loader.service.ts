import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

import { ContentService } from './content.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ApiTranslationLoader implements TranslateLoader {

    constructor(public contentService: ContentService, @Inject(PLATFORM_ID) private platformId: Object) { }

    public getTranslation(lang: string): Observable<any> {
        if (isPlatformBrowser(this.platformId)) {
            return this.contentService.get(lang);
        }
        return Observable.of({});
    }
}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class CustomMissingTranslationHandler implements MissingTranslationHandler {
    public handle(params: MissingTranslationHandlerParams) {
        return params.key;
    }
}
