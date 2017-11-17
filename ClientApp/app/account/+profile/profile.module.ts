import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { routing } from './profile.routes';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { UserInfoComponent } from './user-info';
import { UpdatePasswordComponent } from './update-password';
import { UserPhotoComponent } from './user-photo';
import { OtherAccountsComponent } from './other-accounts';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [
        ProfileComponent,
        UserInfoComponent,
        UpdatePasswordComponent,
        UserPhotoComponent,
        OtherAccountsComponent,
    ],
    providers: [ProfileService]
})
export class ProfileModule { }
