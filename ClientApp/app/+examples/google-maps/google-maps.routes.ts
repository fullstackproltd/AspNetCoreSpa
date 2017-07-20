import { Routes, RouterModule } from '@angular/router';

import { GoogleMapsComponent } from './google-maps.component';

const routes: Routes = [
    {
        path: '', component: GoogleMapsComponent
    }
];

export const routing = RouterModule.forChild(routes);
