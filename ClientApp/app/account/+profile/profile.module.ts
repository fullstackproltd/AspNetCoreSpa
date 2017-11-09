import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { routing } from './profile.routes';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { UserInfoComponent } from './user-info';
import { UpdatePasswordComponent } from './update-password';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [
        ProfileComponent,
        UserInfoComponent,
        UpdatePasswordComponent
    ],
    providers: [ProfileService]
})
export class ProfileModule { }
