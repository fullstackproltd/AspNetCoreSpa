import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { routing } from './create.routes';
import { CreateAccountComponent } from './create.component';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [CreateAccountComponent]
})
export class CreateAccountModule { }
