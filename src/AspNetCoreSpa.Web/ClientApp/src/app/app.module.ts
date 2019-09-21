import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { PrebootModule } from 'preboot';

import { environment } from '../environments/environment';

import { AppSharedModule } from './appshared';
import { ToastrModule } from './toastr';

import { routes } from './app.routes';
// Components
import { FooterComponent, HeaderComponent, ModalComponent, PrivacyComponent, ModalTemplateDirective } from '@app/components';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// Services
import { AppService, AuthService, DataService, GlobalErrorHandler, ModalService, ModalStateService, AuthInterceptor, TimingInterceptor } from '@app/services';
export function appServiceFactory(appService: AppService, authService: AuthService): Function {
  return () => appService.getAppData(authService);
}
@NgModule({
  declarations: [
    // Components
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ModalComponent,
    ModalTemplateDirective,
    PrivacyComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    // PrebootModule.withConfig({ appRoot: 'appc-root' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    AppSharedModule,
    // OAuthModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AppService,
    AuthService,
    DataService,
    ModalService,
    ModalStateService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: appServiceFactory, deps: [AppService, AuthService], multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
