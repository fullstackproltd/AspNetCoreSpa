import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';

import { ExamplesComponent } from './examples.component';
import { routes } from './examples.routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExamplesComponent]
})
export class ExamplesModule { }
