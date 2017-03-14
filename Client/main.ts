import './polyfills';
import './styles/vendor.css';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/throw';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

// Enable either Hot Module Reloading or production mode
/* tslint:disable */
if (module['hot']) {
    module['hot'].accept();
    module['hot'].dispose(() => { });
} else {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
