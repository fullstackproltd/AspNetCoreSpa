import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { state: 'login' } }
];

export const routing = RouterModule.forChild(routes);
