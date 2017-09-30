import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // Lazy async modules
  {
    path: 'login', loadChildren: './account/+login/login.module#LoginModule'
  },
  {
    path: 'register', loadChildren: './account/+register/register.module#RegisterModule'
  },
  {
    path: 'profile', loadChildren: './account/+profile/profile.module#ProfileModule'
  },
  {
    path: 'admin', loadChildren: './+admin/admin.module#AdminModule'
  },
  {
    path: 'chat', loadChildren: './+chat/chat.module#ChatModule'
  }
];

export const routing = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });
