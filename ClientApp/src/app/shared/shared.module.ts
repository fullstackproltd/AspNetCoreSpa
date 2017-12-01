import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { DynamicFormComponent, DynamicFormControlComponent, ErrorSummaryComponent, FormControlService } from './forms';
import { SocialLoginComponent } from './components/social-login/social-login.component';
// Services

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    // No need to export as these modules don't expose any components/directive etc'
  ],
  declarations: [
    SocialLoginComponent,
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Providers, Components, directive, pipes
    SocialLoginComponent,
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
  ],
  providers: [
    NgbModule,
    FormControlService
  ]

})
export class SharedModule { }

export * from './forms';
