import { Routes, RouterModule } from '@angular/router';

import { load } from '../utils/async-ng-module-loader';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // Lazy async modules
  {
    path: 'login', loadChildren: load(() => new Promise(resolve => {
      (require as any).ensure([], (require: any) => {
        resolve(require('./+login/login.module').LoginModule);
      })
    }))
  },
  {
    path: 'register', loadChildren: load(() => new Promise(resolve => {
      (require as any).ensure([], (require: any) => {
        resolve(require('./+register/register.module').RegisterModule);
      })
    }))
  },
  {
    path: 'profile', loadChildren: load(() => new Promise(resolve => {
      (require as any).ensure([], (require: any) => {
        resolve(require('./+profile/profile.module').ProfileModule);
      })
    }))
  },
  {
    path: 'admin', loadChildren: load(() => new Promise(resolve => {
      (require as any).ensure([], (require: any) => {
        resolve(require('./+admin/admin.module').AdminModule);
      })
    }))
  },
  {
    path: 'about', loadChildren: load(() => new Promise(resolve => {
      (require as any).ensure([], (require: any) => {
        resolve(require('./+about/about.module').AboutModule);
      })
    }))
  },
];

export const routing = RouterModule.forRoot(routes);
