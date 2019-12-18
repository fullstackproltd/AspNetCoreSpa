import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';

import { ExamplesComponent } from './examples.component';
import { routes } from './examples.routes';
import { FormsPlaygroundComponent } from './examples/forms-playground/forms-playground.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExamplesComponent, FormsPlaygroundComponent]
})
export class ExamplesModule { }
