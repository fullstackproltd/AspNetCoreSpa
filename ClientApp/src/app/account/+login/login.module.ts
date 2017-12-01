import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: LoginComponent, data: { state: 'login' } }
        ])
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
