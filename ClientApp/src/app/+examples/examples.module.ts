import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { routing } from './examples.routes';
import { ExamplesComponent } from './examples.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [ExamplesComponent]
})
export class ExamplesModule { }
