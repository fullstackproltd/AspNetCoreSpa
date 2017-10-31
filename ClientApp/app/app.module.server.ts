import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppModuleShared } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        // As explained here, animations module used document hence we need Noop animations module on server
        // https://github.com/angular/angular/issues/14784
        NoopAnimationsModule,
        AppModuleShared,
    ]
})
export class AppModule { }
