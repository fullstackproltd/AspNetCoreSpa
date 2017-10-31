import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { APP_SETTINGS } from './settings';

@Injectable()
export class AppLoadService {

  constructor(private httpClient: HttpClient) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // doing something
        resolve();
      }, 0); // Could add an artificial delay
    });
  }

  getSettings(): Promise<any> {
    const promise = this.httpClient.get<any>('assets/mock-settings.json')
      .toPromise()
      .then(settings => {
        APP_SETTINGS.connectionString = settings[0].value;
        APP_SETTINGS.defaultImageUrl = settings[1].value;
        return settings;
      });

    return promise;
  }
}
