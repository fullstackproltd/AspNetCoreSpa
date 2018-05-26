import { NgModule, Optional, SkipSelf, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// App level components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// App level services
import { AccountService } from './services/account.service';
import { SimpleNotificationsModule } from './simple-notifications/simple-notifications.module';
import { DataService } from './services/data.service';
import { GlobalErrorHandler } from './services/global-error.service';
import { TimingInterceptor } from './services/interceptors/timing-interceptor';
import { AuthInterceptor } from './services/interceptors/auth-interceptor';
import { TranslatePipe } from '../translate.pipe';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        TranslatePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        SimpleNotificationsModule.forRoot(),
    ],
    exports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        // Components
        HeaderComponent,
        FooterComponent,
        TranslatePipe
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
                AccountService,
                DataService,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
                { provide: ErrorHandler, useClass: GlobalErrorHandler }
            ]
        };
    }
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
