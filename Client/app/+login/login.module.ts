import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SocialLoginComponent } from './sociallogin/social-login.component';
import { LoginComponent } from './login.component';
import { routing } from './login.routes';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [LoginComponent, SocialLoginComponent]
})
export class LoginModule { }
