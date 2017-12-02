import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './+register/register.component';
import { RegisterConfirmationComponent } from './+confirmation/register-confirmation.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', redirectTo: 'registerhome', pathMatch: 'full', data: { state: 'register' } },
            { path: 'registerhome', component: RegisterComponent },
            { path: 'registerconfirmation', component: RegisterConfirmationComponent }
        ])
    ],
    declarations: [RegisterComponent, RegisterConfirmationComponent]
})
export class RegisterModule { }
