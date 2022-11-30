import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { routes } from './app.routes';
// Components
import { FooterComponent, HeaderComponent, PrivacyComponent } from '@app/components';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    PrivacyComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
