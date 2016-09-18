import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';

import { PageHeadingComponent } from './directives';
import { DynamicFormComponent, DynamicFormControlComponent, ErrorMessageComponent, ErrorSummaryComponent, FormControlService } from './forms';
import { HeaderComponent, FooterComponent } from './layout';
// Services
import { DataService } from './services/data.service';
import { ApiGatewayService } from './services/api-gateway.service';
import { AuthService } from './services/auth.service';
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { ContentService } from './services/content.service';
import { UtilityService } from './services/utility.service';
import { UppercasePipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // NgbModule,
    // No need to export as these modules don't expose any components/directive etc'
    HttpModule,
    JsonpModule,
    // TranslateModule.forRoot({ provide: TranslateLoader, useClass: ApiTranslationLoader })
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
    ReactiveFormsModule,
    RouterModule,
    // NgbModule,
    // TranslateModule,
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
        // Providers
        HttpErrorHandlerService,
        ApiGatewayService,
        AuthService,
        DataService,
        ContentService,
        FormControlService,
        UtilityService
      ]
    };
  }
}
