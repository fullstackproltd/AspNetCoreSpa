import { Routes, RouterModule }  from '@angular/router';

import { AnimationsComponent }  from './animations.component';

const routes: Routes = [
  { path: '', component: AnimationsComponent }
];

export const routing = RouterModule.forChild(routes);
