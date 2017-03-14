import { Routes, RouterModule } from '@angular/router';

import { StripePaymentComponent } from './stripe-payment.component';

const routes: Routes = [
    {
        path: '', component: StripePaymentComponent
    }
];
export const routing = RouterModule.forChild(routes);
