import { NgModule } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { SharedModule } from '../../shared/shared.module';
import { routing } from './google-maps.routes';
import { GoogleMapsComponent } from './google-maps.component';

@NgModule({
    imports: [
        routing,
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAQaGCkBos_D0w-cRhR2jD45yl99FjPFg8'
        })

    ],
    exports: [],
    declarations: [
        GoogleMapsComponent
    ],
    providers: [],
})
export class GoogleMapsModule { }
