import { Routes } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { PrivacyComponent } from '@app/components';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: { state: 'home' } },
  { path: 'examples', loadChildren: () => import('./+examples/examples.module').then(m => m.ExamplesModule) },
  { path: 'privacy', component: PrivacyComponent }
];
