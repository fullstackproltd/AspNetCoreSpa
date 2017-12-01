import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { routing } from './create.routes';
import { CreateAccountComponent } from './create.component';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [CreateAccountComponent]
})
export class CreateAccountModule { }
