import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ApiTranslationLoader } from './core/services/api-translation-loader.service';
// import { BrowserPrebootModule } from 'preboot/browser';

// import { CoreModule } from './core';

import { HomeModule } from './home/home.module';

import { routing } from './app.routes';
import { AppService } from './app.service';
import { AppComponent } from './app.component';

export function getAppData(appService: AppService) {
    return () => appService.getData();
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        // BrowserPrebootModule.replayEvents(),
        HttpClientModule,
        BrowserAnimationsModule,
        routing,
        TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: ApiTranslationLoader } }),
        // CoreModule.forRoot(),
        OAuthModule.forRoot(),
        HomeModule,
    ],
    providers: [
        AppService,
        // { provide: APP_INITIALIZER, useFactory: getAppData, deps: [AppService], multi: true },

    ],
    exports: [
    ]
})
export class AppModule { }
