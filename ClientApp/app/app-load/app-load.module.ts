import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppLoadService } from './app-load.service';

export function init_app(appLoadService: AppLoadService) {
  return () => appLoadService.initializeApp();
}

export function get_settings(appLoadService: AppLoadService) {
  return () => appLoadService.getSettings();
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    { provide: APP_INITIALIZER, useFactory: get_settings, deps: [AppLoadService], multi: true }
  ]
})
export class AppLoadModule { }
