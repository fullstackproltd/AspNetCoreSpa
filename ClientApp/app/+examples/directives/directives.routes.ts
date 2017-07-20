import { Routes, RouterModule } from '@angular/router';

import { DirectivesHomeComponent } from './directives-home.component';

const routes: Routes = [
    {
        path: '', component: DirectivesHomeComponent
    }
];

export const routing = RouterModule.forChild(routes);
