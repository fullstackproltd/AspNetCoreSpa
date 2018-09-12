import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppSharedModule } from '../appshared';
// Components
// Pipes
import { UppercasePipe } from './pipes/uppercase.pipe';
// Services
import { SubMenuComponent, AppTableComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppSharedModule,
    NgbModule,
    NgxDatatableModule
    // No need to export as these modules don't expose any components/directive etc'
  ],
  declarations: [
    UppercasePipe,
    SubMenuComponent,
    AppTableComponent
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppSharedModule,
    NgxDatatableModule,
    NgbModule,
    // Components, directive, pipes
    UppercasePipe,
    SubMenuComponent,
    AppTableComponent
  ],
  providers: [
  ]

})
export class SharedModule { }

export * from './components';
export * from './pipes';
