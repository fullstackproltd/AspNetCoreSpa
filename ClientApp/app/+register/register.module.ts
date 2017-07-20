import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './+register/register.component';
import { RegisterConfirmationComponent } from './+confirmation/register-confirmation.component';
import { routing } from './register.routes';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [RegisterComponent, RegisterConfirmationComponent]
})
export class RegisterModule { }
