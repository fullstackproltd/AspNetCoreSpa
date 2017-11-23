import { NgModule, Optional, SkipSelf, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// App level components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// App level services
import { AccountService } from './services/account.service';
import { DataService } from './services/data.service';
import { UtilityService } from './services/utility.service';
import { LogService, LogPublishersService } from './services/log';
import { AuthInterceptor, TimingInterceptor } from './services/interceptors';
import { GlobalErrorHandler } from './services/global-error.service';
import { SimpleNotificationsModule } from './simple-notifications';
import { GlobalRef, BrowserGlobalRef } from './global-ref';

export * from './services/account.service';
export * from './services/data.service';
export * from './services/utility.service';
export * from './services/log';
export * from './models';
export * from './simple-notifications';
@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        HttpClientModule,
        NgbModule.forRoot(),
        RouterModule,
        // https://github.com/flauc/angular2-notifications/blob/master/docs/toastNotifications.md
        SimpleNotificationsModule.forRoot(),
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
                DataService,
                LogService,
                LogPublishersService,
                UtilityService,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
                { provide: ErrorHandler, useClass: GlobalErrorHandler },
                { provide: GlobalRef, useClass: BrowserGlobalRef }
            ]
        };
    }
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
