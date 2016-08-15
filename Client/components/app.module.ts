import { NgModule, NgModuleFactoryLoader }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/Router';

import { AsyncNgModuleLoader } from '../utils/async-ng-module-loader';
import { routing }        from './app.routes';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { SharedModule }  from './shared/shared.module';
import { HomeModule }  from './home/home.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        routing,
        // FormsModule,
        HttpModule,
        // Only module that app module loads
        SharedModule.forRoot(),
        HomeModule
    ],
    providers: [
        AppService,
        { provide: NgModuleFactoryLoader, useClass: AsyncNgModuleLoader }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }