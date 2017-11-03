import { NgModule, Optional, SkipSelf, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// App level components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// App level services
import { AccountService } from './services/account.service';
import { DataService } from './services/data.service';
import { UtilityService } from './services/utility.service';
import { LogService, LogPublishersService } from './services/log';
import { ApiTranslationLoader } from './services/api-translation-loader.service';
import { ContentService } from './services/content.service';
import { AuthInterceptor, TimingInterceptor } from './services/interceptors';
import { GlobalErrorHandler } from './services/global-error.service';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        NgbModule,
        RouterModule,
        TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: ApiTranslationLoader } }),
    ],
    exports: [
        RouterModule,
        // Components
        HeaderComponent,
        FooterComponent
    ],
    providers: []
})
export class CoreModule {
    // forRoot allows to override providers
    // https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AccountService,
                ContentService,
                DataService,
                DataService,
                LogService,
                LogPublishersService,
                UtilityService,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
                { provide: ErrorHandler, useClass: GlobalErrorHandler }
            ]
        };
    }
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
