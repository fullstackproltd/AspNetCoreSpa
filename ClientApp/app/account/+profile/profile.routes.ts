import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { UserInfoComponent } from './user-info';
import { UpdatePasswordComponent } from './update-password';
import { UserPhotoComponent } from './user-photo';
import { OtherAccountsComponent } from './other-accounts';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      { path: '', redirectTo: 'userinfo' },
      { path: 'userinfo', component: UserInfoComponent },
      { path: 'updatepassword', component: UpdatePasswordComponent },
      { path: 'userphoto', component: UserPhotoComponent },
      { path: 'otheraccounts', component: OtherAccountsComponent }
    ]
  },
];

export const routing = RouterModule.forChild(routes);
