import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppSharedModule } from '../appshared';
// Components
import {
  SubMenuComponent,
  AppTableComponent,
  AppTableFilteringDirective,
  // Forms
  AppFormComponent,
  FormFieldDirective,
  FormButtonComponent,
  FormInputComponent,
  FormFileComponent,
  FormDateComponent,
  FormTimeComponent,
  FormTextareaComponent,
  FormCheckboxComponent,
  FormCheckboxListComponent,
  FormRadioListComponent,
  FormSelectComponent,
  FormFieldErrorComponent,
  FormsService,
  FieldColorValidationDirective,
} from './components';
// Pipes
import { UppercasePipe } from './pipes/uppercase.pipe';
// Services
import { CustomDateFormatter, CustomNgbDateNativeUTCAdapter } from './services';

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
  entryComponents: [
    AppFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormFileComponent,
    FormDateComponent,
    FormTimeComponent,
    FormTextareaComponent,
    FormCheckboxComponent,
    FormCheckboxListComponent,
    FormRadioListComponent,
    FormSelectComponent
  ]
  ,
  declarations: [
    UppercasePipe,
    SubMenuComponent,
    AppTableComponent,
    AppTableFilteringDirective,
    // Forms
    // directives
    FormFieldDirective,
    FieldColorValidationDirective,
    // components
    AppFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormFileComponent,
    FormDateComponent,
    FormTimeComponent,
    FormTextareaComponent,
    FormCheckboxComponent,
    FormCheckboxListComponent,
    FormRadioListComponent,
    FormSelectComponent,
    FormFieldErrorComponent
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
    AppTableComponent,
    // Forms
    AppFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormFileComponent,
    FormDateComponent,
    FormTimeComponent,
    FormTextareaComponent,
    FormCheckboxComponent,
    FormCheckboxListComponent,
    FormRadioListComponent,
    FormSelectComponent,
    FormFieldErrorComponent
  ],
  providers: [
    FormsService,
    { provide: NgbDateParserFormatter, useClass: CustomDateFormatter },
    { provide: NgbDateAdapter, useClass: CustomNgbDateNativeUTCAdapter },
  ]

})
export class SharedModule { }

export * from './components';
export * from './pipes';
