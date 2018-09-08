import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { PrebootModule } from 'preboot';

import { environment } from '../environments/environment';

import { CoreModule, AuthService } from './core';
import { AppSharedModule } from './appshared';
import { SimpleNotificationsModule } from './simple-notifications';

// Components
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { CookieConsentComponent, FooterComponent, HeaderComponent, ModalComponent, PrivacyComponent } from './components';
import { HomeComponent } from './home/home.component';
export function appServiceFactory(appService: AppService, authService: AuthService): Function {
  return () => appService.getAppData(authService);
}
@NgModule({
  declarations: [
    // Components
    AppComponent,
    HomeComponent,
    CookieConsentComponent,
    FooterComponent,
    HeaderComponent,
    ModalComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    // PrebootModule.withConfig({ appRoot: 'appc-root' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    CoreModule.forRoot(),
    AppSharedModule,
    // OAuthModule.forRoot(),
    NgbModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AppService,
    { provide: APP_INITIALIZER, useFactory: appServiceFactory, deps: [AppService, AuthService], multi: true }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
