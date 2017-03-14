import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { routing } from './profile.routes';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ChangeNameComponent } from './changename/change-name.component';
import { ChangePasswordComponent } from './changepassword/change-password.component';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [ProfileComponent, ChangeNameComponent, ChangePasswordComponent],
    providers: [ProfileService]
})
export class ProfileModule { }
