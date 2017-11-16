import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { DynamicFormComponent, DynamicFormControlComponent, ErrorSummaryComponent } from './forms';
// Directives
import { PageHeadingComponent } from './directives';
// Pipes
import { UppercasePipe } from './pipes';
// Services
import { FormControlService } from './forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // No need to export as these modules don't expose any components/directive etc'
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
    PageHeadingComponent,
    UppercasePipe
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // Providers, Components, directive, pipes
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
    PageHeadingComponent,
    UppercasePipe,
  ],
  providers: [
    FormControlService
  ]

})
export class SharedModule { }
