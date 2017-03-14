import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './+register/register.component';
import { RegisterConfirmationComponent } from './+confirmation/register-confirmation.component';

const routes: Routes = [
  { path: '', redirectTo: 'registerhome', pathMatch: 'full' },
  { path: 'registerhome', component: RegisterComponent },
  { path: 'registerconfirmation', component: RegisterConfirmationComponent }
];

export const routing = RouterModule.forChild(routes);
