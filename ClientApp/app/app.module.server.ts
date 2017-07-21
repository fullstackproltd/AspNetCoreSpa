import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './app.component';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        ServerModule,
        // As explained here, animations module used document hence we need Noop animations module on server
        // https://github.com/angular/angular/issues/14784
        NoopAnimationsModule,
        AppModuleShared,
    ]
})
export class AppModule { }
