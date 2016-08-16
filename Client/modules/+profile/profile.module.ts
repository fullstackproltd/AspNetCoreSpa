import { NgModule }       from '@angular/core';
// import { FormBuilder }  from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { SharedModule }            from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { routing }            from './profile.routes';
import { ChangeNameComponent } from './changename';
import { ChangePasswordComponent } from './changepassword';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [ProfileComponent, ChangeNameComponent, ChangePasswordComponent],
    providers: [ProfileService]
})
export class ProfileModule { }
