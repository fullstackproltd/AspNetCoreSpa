import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { routing } from './profile.routes';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { UserInfoComponent } from './user-info';
import { UpdatePasswordComponent } from './update-password';
import { UserPhotoComponent } from './user-photo';
import { OtherAccountsComponent } from './other-accounts';
import { TwoFactorAuthComponent, EnableAuthenticatorComponent, ResetAuthenticatorComponent, RecoveryCodesComponent } from './two-factor-auth';

@NgModule({
    imports: [
        routing,
        SharedModule
    ],
    declarations: [
        ProfileComponent,
        UserInfoComponent,
        UpdatePasswordComponent,
        UserPhotoComponent,
        OtherAccountsComponent,
        TwoFactorAuthComponent,
        EnableAuthenticatorComponent,
        ResetAuthenticatorComponent,
        RecoveryCodesComponent,
    ],
    providers: [ProfileService]
})
export class ProfileModule { }
