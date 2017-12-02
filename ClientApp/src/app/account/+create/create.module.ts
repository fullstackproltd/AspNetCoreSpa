import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreateAccountComponent } from './create.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CreateAccountComponent, data: { state: 'login' } }
        ])
    ],
    declarations: [CreateAccountComponent]
})
export class CreateAccountModule { }
