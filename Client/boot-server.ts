// import 'angular2-universal/polyfills';
// import { provide, PLATFORM_DIRECTIVES } from '@angular/core';
// import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
// import * as ngUniversal from 'angular2-universal';
// import { BASE_URL, ORIGIN_URL, REQUEST_URL } from 'angular2-universal/common';
// import { AppComponent } from './components/app.component';

// export default function (params: any): Promise<{ html: string, globals?: any }> {
//     const serverBindings = [
//         provide(BASE_URL, { useValue: '/' }),
//         provide(ORIGIN_URL, { useValue: params.origin }),
//         provide(REQUEST_URL, { useValue: params.url }),
//         provide(PLATFORM_DIRECTIVES, {useValue: [ROUTER_DIRECTIVES], multi: true}),
//         ...ngUniversal.NODE_PLATFORM_PIPES,
//         ...ngUniversal.NODE_ROUTER_PROVIDERS,
//         ...ngUniversal.NODE_HTTP_PROVIDERS,
//     ];

//     let bootloader = ngUniversal.bootloader({
//         directives: [AppComponent],
//         componentProviders: serverBindings,
//         async: true,
//         preboot: false,
//         // TODO: Render just the <app> component instead of wrapping it inside an extra HTML document
//         // Waiting on https://github.com/angular/universal/issues/347
//         template: '<!DOCTYPE html>\n<html><head></head><body><sc-app></sc-app></body></html>'
//     });

//     return bootloader.serializeApplication().then(html => {
//         bootloader.dispose();
//         return { html };
//     });
// }
