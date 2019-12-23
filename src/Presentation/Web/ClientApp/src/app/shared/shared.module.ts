import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgbModule, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import {
  CustomDateFormatter,
  CustomNgbDateNativeUTCAdapter,
  AuthInterceptor,
  LoadingInterceptor,
  JwtInterceptor,
  TimingInterceptor,
  GlobalErrorHandler,
  AppService,
} from './services';

// Components
import {
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
  FormButtonGroupComponent,
  FormInputGroupComponent,
  FormFilePathComponent,
  // Custom components
  AccordionComponent,
  PageHeadingComponent,
  CardDeckComponent,
  CardComponent,
  ToggleSwitchComponent,
  SearchInputComponent,
  TypeaheadComponent,
  ListComponent,
  ModalComponent,
  ModalTemplateDirective,
  ToastComponent,
  AppFileInputDirective,
  ImageResizerComponent,
  LoadingComponent,
  LoginComponent,
  LogoutComponent,
  LoginMenuComponent,
  // Grid
  GridComponent,
  ActionButtonsComponent,
  ActionButtonComponent,
  DateFilterComponent,
  DropdownFloatingFilterComponent,
} from './components';
import { ApplicationPaths } from './constants';
// Pipes
import { UppercasePipe, TranslatePipe, GroupByPipe, SafePipe } from './pipes';

export function appServiceFactory(appService: AppService): () => Promise<any> {
  return () => appService.getAppData();
}
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModule,
    AgGridModule.withComponents([ActionButtonsComponent, ActionButtonComponent, DateFilterComponent, DropdownFloatingFilterComponent]),
    RouterModule.forChild([
      { path: ApplicationPaths.Register, component: LoginComponent },
      { path: ApplicationPaths.Profile, component: LoginComponent },
      { path: ApplicationPaths.Login, component: LoginComponent },
      { path: ApplicationPaths.LoginFailed, component: LoginComponent },
      { path: ApplicationPaths.LoginCallback, component: LoginComponent },
      { path: ApplicationPaths.LogOut, component: LogoutComponent },
      { path: ApplicationPaths.LoggedOut, component: LogoutComponent },
      { path: ApplicationPaths.LogOutCallback, component: LogoutComponent },
    ]),
    // No need to export as these modules don't expose any components/directive etc'
  ],
  declarations: [
    // pipes
    UppercasePipe,
    TranslatePipe,
    GroupByPipe,
    SafePipe,
    // Forms
    FormFieldDirective,
    FieldColorValidationDirective,
    AppFormComponent,
    FormButtonComponent,
    FormButtonGroupComponent,
    FormInputComponent,
    FormInputGroupComponent,
    FormFileComponent,
    AppFileInputDirective,
    FormFilePathComponent,
    FormDateComponent,
    FormTimeComponent,
    FormTextareaComponent,
    FormCheckboxComponent,
    FormCheckboxListComponent,
    FormRadioListComponent,
    FormSelectComponent,
    FormFieldErrorComponent,
    // Custom comonents
    LoginComponent,
    LogoutComponent,
    LoginMenuComponent,
    AccordionComponent,
    PageHeadingComponent,
    CardDeckComponent,
    CardComponent,
    ToggleSwitchComponent,
    SearchInputComponent,
    TypeaheadComponent,
    ListComponent,
    ModalComponent,
    ModalTemplateDirective,
    ToastComponent,
    ImageResizerComponent,
    LoadingComponent,
    // Grid
    GridComponent,
    DateFilterComponent,
    DropdownFloatingFilterComponent,
    ActionButtonsComponent,
    ActionButtonComponent,
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // pipes
    UppercasePipe,
    TranslatePipe,
    GroupByPipe,
    SafePipe,
    // Forms
    FormFieldDirective,
    FieldColorValidationDirective,
    AppFormComponent,
    FormButtonComponent,
    FormButtonGroupComponent,
    FormInputComponent,
    FormInputGroupComponent,
    FormFileComponent,
    AppFileInputDirective,
    FormFilePathComponent,
    FormDateComponent,
    FormTimeComponent,
    FormTextareaComponent,
    FormCheckboxComponent,
    FormCheckboxListComponent,
    FormRadioListComponent,
    FormSelectComponent,
    FormFieldErrorComponent,
    // Custom comonents
    LoginComponent,
    LogoutComponent,
    LoginMenuComponent,
    AccordionComponent,
    PageHeadingComponent,
    CardDeckComponent,
    CardComponent,
    ToggleSwitchComponent,
    SearchInputComponent,
    TypeaheadComponent,
    ListComponent,
    ModalComponent,
    ModalTemplateDirective,
    ToastComponent,
    ImageResizerComponent,
    LoadingComponent,
    // Grid
    GridComponent,
    DateFilterComponent,
    DropdownFloatingFilterComponent,
    ActionButtonsComponent,
    ActionButtonComponent,
  ],
  entryComponents: [
    AppFormComponent,
    FormButtonComponent,
    FormButtonGroupComponent,
    FormInputComponent,
    FormInputGroupComponent,
    FormFileComponent,
    FormFilePathComponent,
    FormDateComponent,
    FormTimeComponent,
    FormTextareaComponent,
    FormCheckboxComponent,
    FormCheckboxListComponent,
    FormRadioListComponent,
    FormSelectComponent,
  ],
  providers: [
    CurrencyPipe,
    DatePipe,
    FormsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: appServiceFactory, deps: [AppService], multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: NgbDateParserFormatter, useClass: CustomDateFormatter },
    { provide: NgbDateAdapter, useClass: CustomNgbDateNativeUTCAdapter },
  ],
})
export class SharedModule {}

// Public apis
export * from './components';
export * from './constants';
export * from './models';
export * from './pipes';
export * from './services';
