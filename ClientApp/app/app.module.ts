import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './shared';
import { CoreModule } from './core';

import { HomeModule } from './home/home.module';

import { routing } from './app.routes';
import { AppService } from './app.service';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        NgbModule.forRoot(),
        CoreModule.forRoot(),
        SharedModule,
        HomeModule,
    ],
    providers: [
        AppService
    ],
    exports: [
        SharedModule,
        CoreModule,
        NgbModule
    ]
})
export class AppModuleShared { }
