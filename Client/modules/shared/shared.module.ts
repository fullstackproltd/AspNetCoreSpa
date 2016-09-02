import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PageHeadingComponent } from './directives';
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
    PageHeadingComponent,
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
    PageHeadingComponent,
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
