import { NgModule, Optional, SkipSelf, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// App level services
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { GlobalErrorHandler } from './services/global-error.service';
import { TimingInterceptor } from './services/interceptors/timing-interceptor';
import { AuthInterceptor } from './services/interceptors/auth-interceptor';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ],
    exports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule
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
                AuthService,
                DataService,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
                { provide: ErrorHandler, useClass: GlobalErrorHandler }
            ]
        };
    }
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}

export * from './services';
