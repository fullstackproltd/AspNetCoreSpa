import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PrebootModule } from 'preboot';

import { environment } from '../environments/environment';

import { CoreModule } from './core';
import { AppSharedModule } from './appshared';
import { SimpleNotificationsModule } from './simple-notifications';

// Components
import { AppComponent } from './app.component';
import { CookieConsentComponent, FooterComponent, HeaderComponent, ModalComponent, PrivacyComponent } from './components';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
export function appServiceFactory(appService: AppService): Function {
  return () => appService.getAppData();
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
    PrebootModule.withConfig({ appRoot: 'appc-root' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    CoreModule.forRoot(),
    AppSharedModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', data: { state: 'home' } },
      { path: 'signalr', loadChildren: './+signalr/signalr.module#SignalrModule' },
      { path: 'privacy', component: PrivacyComponent },
    ], { initialNavigation: 'enabled' }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AppService,
    { provide: APP_INITIALIZER, useFactory: appServiceFactory, deps: [AppService], multi: true }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
