import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@app/core';

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
        BrowserModule,
        BrowserAnimationsModule,
        routing,
        CoreModule.forRoot(),
        HomeModule,
    ],
    providers: [
        AppService,
        { provide: APP_INITIALIZER, useFactory: getAppData, deps: [AppService], multi: true },

    ],
    exports: [
    ]
})
export class AppModule { }
