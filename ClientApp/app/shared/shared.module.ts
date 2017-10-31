import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { AppTableComponent, EditTemplateComponent, ImageUploaderComponent, SecureImageComponent, LoadingSpinnerComponent } from './components';
import { DynamicFormComponent, DynamicFormControlComponent, ErrorSummaryComponent } from './forms';
// Directives
import { PageHeadingComponent } from './directives';
// Pipes
import { KeysPipe, UppercasePipe } from './pipes';
// Services
import { FormControlService } from './forms';

@NgModule({
  entryComponents: [EditTemplateComponent],
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
    AppTableComponent,
    UppercasePipe,
    KeysPipe,
    EditTemplateComponent,
    ImageUploaderComponent,
    SecureImageComponent,
    LoadingSpinnerComponent
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
    ImageUploaderComponent,
    AppTableComponent,
    LoadingSpinnerComponent,
    UppercasePipe,
    KeysPipe,
  ],
  providers: [
    FormControlService
  ]

})
export class SharedModule {
  // public static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: SharedModule,

  //   };
  // }
}
