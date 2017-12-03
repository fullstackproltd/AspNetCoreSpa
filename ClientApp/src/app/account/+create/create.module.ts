import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { CreateAccountComponent } from './create.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: CreateAccountComponent, pathMatch: 'full', data: { state: 'create' } }
        ])
    ],
    declarations: [CreateAccountComponent]
})
export class CreateAccountModule { }
