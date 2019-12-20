import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  model: any;

  constructor() {}

  get config() {
    return this.model;
  }

  async load(): Promise<any> {
    const configResponse = await fetch('assets/config.json');
    this.model = await configResponse.json();
    return this.model;
  }
}
