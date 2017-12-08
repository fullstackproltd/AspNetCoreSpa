import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CoreModule } from './core/core.module';

import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// Services
import { AppService } from './app.service';
export function getAppData(appService: AppService) {
  return () => appService.getData();
}

@NgModule({
  declarations: [
    // Components
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    CoreModule.forRoot(),
    NgbModule.forRoot(),
    OAuthModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', loadChildren: './account/+login/login.module#LoginModule' },
      { path: 'register', loadChildren: './account/+register/register.module#RegisterModule' },
      { path: 'createaccount', loadChildren: './account/+create/create.module#CreateAccountModule' },
      { path: 'profile', loadChildren: './account/+profile/profile.module#ProfileModule' },
      { path: 'chat', loadChildren: './+chat/chat.module#ChatModule' }
    ]),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AppService,
    { provide: APP_INITIALIZER, useFactory: getAppData, deps: [AppService], multi: true }
  ],
  exports: [
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
