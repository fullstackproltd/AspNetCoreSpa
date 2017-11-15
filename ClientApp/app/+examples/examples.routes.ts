import { Routes, RouterModule } from '@angular/router';

import { ExamplesComponent } from './examples.component';

const routes: Routes = [
  {
    path: '', component: ExamplesComponent
  }
];

export const routing = RouterModule.forChild(routes);
