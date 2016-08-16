import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent }
];

export const routing = RouterModule.forChild(routes);
