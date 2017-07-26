import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';

import { routing } from './app.routes';
import { AppService } from './app.service';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        CoreModule.forRoot(),
        SharedModule.forRoot(),
        HomeModule,
    ],
    providers: [
        AppService
    ],
    exports: [
        SharedModule
    ]
})
export class AppModuleShared { }
