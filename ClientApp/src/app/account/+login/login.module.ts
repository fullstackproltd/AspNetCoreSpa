import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './login.component';
import { routing } from './login.routes';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [LoginComponent]
})
export class LoginModule { }
