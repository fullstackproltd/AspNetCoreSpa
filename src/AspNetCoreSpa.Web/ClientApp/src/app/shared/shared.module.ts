import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppSharedModule } from '../appshared';
// Components
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { DynamicFormControlComponent } from './forms/dynamic-form-control/dynamic-form-control.component';
import { ErrorSummaryComponent } from './forms/error-summary/error-summary.component';
// Pipes
import { UppercasePipe } from './pipes/uppercase.pipe';
// Services
import { FormControlService } from './forms/form-control.service';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppSharedModule,
    NgbModule
    // No need to export as these modules don't expose any components/directive etc'
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
    UppercasePipe,
    SubMenuComponent,
    NgbModule
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppSharedModule,
    // Providers, Components, directive, pipes
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
    SubMenuComponent,
    UppercasePipe,
  ],
  providers: [
    FormControlService
  ]

})
export class SharedModule { }
