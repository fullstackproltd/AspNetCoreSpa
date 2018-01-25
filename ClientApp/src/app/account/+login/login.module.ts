import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: LoginComponent, pathMatch: 'full', data: { state: 'login' } }
        ])
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
