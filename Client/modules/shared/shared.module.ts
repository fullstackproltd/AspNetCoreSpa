import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, FormBuilder } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PageHeading } from './directives';
import { DynamicFormComponent, DynamicFormControlComponent, ErrorMessageComponent, ErrorSummaryComponent, FormControlService } from './forms';
import { HeaderComponent, FooterComponent } from './layout';
import { DataService, ApiGateway, AuthService, HttpErrorHandler } from './services';
import { UppercasePipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorMessageComponent,
    ErrorSummaryComponent,
    FooterComponent,
    HeaderComponent,
    PageHeading,
    UppercasePipe
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    RouterModule,
    // Providers, Components, directive, pipes
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
    ErrorMessageComponent,
    FooterComponent,
    HeaderComponent,
    PageHeading,
    UppercasePipe
  ]

})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // Modules
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // Providers
        FormBuilder,
        ApiGateway,
        AuthService,
        DataService,
        HttpErrorHandler,
        FormControlService
      ]
    };
  }
}
