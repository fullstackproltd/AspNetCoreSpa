import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { DynamicFormComponent } from './components/forms/dynamic-form/dynamic-form.component';
import { DynamicFormControlComponent } from './components/forms/dynamic-form-control/dynamic-form-control.component';
import { ErrorSummaryComponent } from './components/forms/error-summary/error-summary.component';
// Services
import { AppService } from './app.service';
import { DataService } from './services/data.service';
import { AccountService } from './services/account.service';
import { GlobalErrorHandler } from './services/global-error.service';
import { GlobalRef, BrowserGlobalRef } from './services/global-ref';
import { FormControlService } from './components/forms/form-control.service';
import { AuthInterceptor } from './services/interceptors/auth-interceptor';
import { TimingInterceptor } from './services/interceptors/timing-interceptor';
// Pipes
import { TranslatePipe } from './translate.pipe';
export function getAppData(appService: AppService) {
  return () => appService.getData();
}

@NgModule({
  declarations: [
    // Components
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SocialLoginComponent,
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
    // Pipes
    TranslatePipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', loadChildren: './account/+login/login.module#LoginModule' },
      { path: 'register', loadChildren: './account/+register/register.module#RegisterModule' },
      { path: 'createaccount', loadChildren: './account/+create/create.module#CreateAccountModule' },
      { path: 'profile', loadChildren: './account/+profile/profile.module#ProfileModule' },
      { path: 'chat', loadChildren: './+chat/chat.module#ChatModule' }
    ]),
    OAuthModule.forRoot(),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
  ],
  providers: [
    AppService,
    AccountService,
    DataService,
    FormControlService,
    GlobalErrorHandler,
    // { provide: APP_INITIALIZER, useFactory: getAppData, deps: [AppService], multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: GlobalRef, useClass: BrowserGlobalRef },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },

  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    // Components
    SocialLoginComponent,
    DynamicFormComponent,
    DynamicFormControlComponent,
    ErrorSummaryComponent,
    // Pipes
    TranslatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
