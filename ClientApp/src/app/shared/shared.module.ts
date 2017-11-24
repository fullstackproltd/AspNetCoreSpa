import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

// Components
import { DynamicFormComponent, DynamicFormControlComponent, ErrorSummaryComponent } from './forms';
import { SocialLoginComponent } from './components';
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
    HttpClientModule
    // No need to export as these modules don't expose any components/directive etc'
  ],
  declarations: [
    SocialLoginComponent,
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
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    // Providers, Components, directive, pipes
    SocialLoginComponent,
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
