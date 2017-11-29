import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SimpleNotificationsModule } from './notifications';
import { HomeModule } from './home/home.module';

import { routing } from './app.routes';
import { environment } from '../environments/environment';

// App level services
import { AppService } from './app.service';
import {
    AccountService,
    AuthInterceptor,
    DataService,
    GlobalErrorHandler,
    LogPublishersService,
    LogService,
    TimingInterceptor,
    UtilityService,
    BrowserGlobalRef,
    GlobalRef,
    HeadService
} from './services';

// App level components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslatePipe } from './translate.pipe';

export function getAppData(appService: AppService) {
    return () => appService.getData();
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        TranslatePipe
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        BrowserAnimationsModule,
        HomeModule,
        HttpClientModule,
        NgbModule.forRoot(),
        OAuthModule.forRoot(),
        environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
        routing,
        // https://github.com/flauc/angular2-notifications/blob/master/docs/toastNotifications.md
        SimpleNotificationsModule.forRoot(),
    ],
    providers: [
        AccountService,
        AppService,
        DataService,
        HeadService,
        LogService,
        LogPublishersService,
        UtilityService,
        { provide: APP_INITIALIZER, useFactory: getAppData, deps: [AppService], multi: true },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: GlobalRef, useClass: BrowserGlobalRef },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },

    ],
    exports: [
    ]
})
export class AppModule { }
