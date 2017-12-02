import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UserPhotoComponent } from './user-photo/user-photo.component';
import { OtherAccountsComponent } from './other-accounts/other-accounts.component';
import { TwoFactorAuthComponent } from './two-factor-auth/two-factor-auth.component';
import { EnableAuthenticatorComponent } from './two-factor-auth/enable-authenticator/enable-authenticator.component';
import { ResetAuthenticatorComponent } from './two-factor-auth/reset-authenticator/reset-authenticator.component';
import { RecoveryCodesComponent } from './two-factor-auth/recovery-codes/recovery-codes.component';
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
                    { path: 'otheraccounts', component: OtherAccountsComponent },
                    { path: 'twofactorauth', component: TwoFactorAuthComponent }
                ]
            },
        ])
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
