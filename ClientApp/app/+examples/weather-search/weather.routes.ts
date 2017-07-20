import { Routes, RouterModule } from '@angular/router';

import { WeatherComponent } from './weather.component';

const routes: Routes = [
    { path: '', component: WeatherComponent }
];

export const routing = RouterModule.forChild(routes);
