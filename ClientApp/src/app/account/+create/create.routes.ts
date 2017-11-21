import { Routes, RouterModule } from '@angular/router';

import { CreateAccountComponent } from './create.component';

const routes: Routes = [
  { path: '', component: CreateAccountComponent, data: { state: 'login' } }
];

export const routing = RouterModule.forChild(routes);
