import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UserPhotoComponent } from './user-photo/user-photo.component';
import { OtherAccountsComponent } from './other-accounts/other-accounts.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: ProfileComponent, children: [
                    { path: '', redirectTo: 'userinfo', pathMatch: 'full' },
                    { path: 'userinfo', component: UserInfoComponent },
                    { path: 'updatepassword', component: UpdatePasswordComponent },
                    { path: 'userphoto', component: UserPhotoComponent },
                    { path: 'otheraccounts', component: OtherAccountsComponent }
                ]
            },
        ])
    ],
    declarations: [
        ProfileComponent,
        UserInfoComponent,
        UpdatePasswordComponent,
        UserPhotoComponent,
        OtherAccountsComponent
    ],
    providers: [ProfileService]
})
export class ProfileModule { }
