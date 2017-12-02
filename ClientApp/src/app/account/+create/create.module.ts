import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreateAccountComponent } from './create.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CreateAccountComponent, pathMatch: 'full', data: { state: 'create' } }
        ])
    ],
    declarations: [CreateAccountComponent]
})
export class CreateAccountModule { }
