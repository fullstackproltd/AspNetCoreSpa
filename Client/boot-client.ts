import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import './polyfills';
import './vendor';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './modules/app.module';

// bootstrap(AppComponent, [router.ROUTER_PROVIDERS, HTTP_PROVIDERS, FormBuilder]);
platformBrowserDynamic().bootstrapModule(AppModule);

// Basic hot reloading support. Automatically reloads and restarts the Angular 2 app each time
// you modify source files. This will not preserve any application state other than the URL.
declare var module: any;

if (module.hot) {
    module.hot.accept();
}
