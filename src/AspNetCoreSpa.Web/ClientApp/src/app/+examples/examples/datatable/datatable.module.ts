import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '@app/shared';
import { DatatableComponent } from './datatable/datatable.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: DatatableComponent }
    ]),
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [DatatableComponent]
})
export class DatatableModule { }
