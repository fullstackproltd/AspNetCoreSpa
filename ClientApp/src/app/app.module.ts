import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SimpleNotificationsModule } from './simple-notifications';
import { HomeModule } from './home/home.module';

import { routing } from './app.routes';

// App level services
import { AppService } from './app.service';
import {
    AccountService,
    ApiTranslationLoader,
    AuthInterceptor,
    DataService,
    GlobalErrorHandler,
    LogPublishersService,
    LogService,
    TimingInterceptor,
    UtilityService
} from './services';

// App level components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

export function getAppData(appService: AppService) {
    return () => appService.getData();
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        BrowserAnimationsModule,
        HomeModule,
        HttpClientModule,
        NgbModule.forRoot(),
        OAuthModule.forRoot(),
        routing,
        // https://github.com/flauc/angular2-notifications/blob/master/docs/toastNotifications.md
        SimpleNotificationsModule.forRoot(),
        TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: ApiTranslationLoader } })
    ],
    providers: [
        AccountService,
        AppService,
        DataService,
        LogService,
        LogPublishersService,
        UtilityService,
        { provide: APP_INITIALIZER, useFactory: getAppData, deps: [AppService], multi: true },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        // { provide: GlobalRef, useClass: BrowserGlobalRef },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },

    ],
    exports: [
    ]
})
export class AppModule { }
