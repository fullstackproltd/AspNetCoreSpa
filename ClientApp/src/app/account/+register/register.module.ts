import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './+register/register.component';
import { RegisterConfirmationComponent } from './+confirmation/register-confirmation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'registerhome', pathMatch: 'full', data: { state: 'register' } },
            { path: 'registerhome', component: RegisterComponent },
            { path: 'registerconfirmation', component: RegisterConfirmationComponent }
        ])
    ],
    declarations: [RegisterComponent, RegisterConfirmationComponent]
})
export class RegisterModule { }
