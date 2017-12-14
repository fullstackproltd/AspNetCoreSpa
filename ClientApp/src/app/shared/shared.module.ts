import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { DynamicFormControlComponent } from './forms/dynamic-form-control/dynamic-form-control.component';
import { ErrorSummaryComponent } from './forms/error-summary/error-summary.component';
// Pipes
import { UppercasePipe } from './pipes/uppercase.pipe';
// Services
import { FormControlService } from './forms/form-control.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // No need to export as these modules don't expose any components/directive etc'
  ],
  declarations: [
    SocialLoginComponent,
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
    UppercasePipe
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Providers, Components, directive, pipes
    SocialLoginComponent,
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
    UppercasePipe,
  ],
  providers: [
    FormControlService
  ]

})
export class SharedModule { }
