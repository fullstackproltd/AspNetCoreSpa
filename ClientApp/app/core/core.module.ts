import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Services
import { AccountService } from './services/account.service';
import { DataService } from './services/data.service';
import { UtilityService } from './services/utility.service';

@NgModule({
    imports: [
    ],
    exports: [
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
                // Providers
                Title,
                AccountService,
                DataService,
                UtilityService
            ]
        };
    }
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
