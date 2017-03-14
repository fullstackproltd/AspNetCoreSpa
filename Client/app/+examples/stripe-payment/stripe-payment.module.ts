import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { routing } from './stripe-payment.routes';
import { StripePaymentComponent } from './stripe-payment.component';

@NgModule({
    imports: [
        routing,
        SharedModule
    ],
    exports: [],
    declarations: [
        StripePaymentComponent
    ],
    providers: [],
})
export class StripePaymentModule { }
