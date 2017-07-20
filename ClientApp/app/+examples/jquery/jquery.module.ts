import { NgModule } from '@angular/core';

import { routing } from './jquery.routes';
import { SharedModule } from '../../shared/shared.module';
import { JqueryComponent } from './jquery.component';
import { JQueryDragComponent } from './drag/drag.component';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    JqueryComponent,
    JQueryDragComponent
  ]
})
export class JqueryModule { }
