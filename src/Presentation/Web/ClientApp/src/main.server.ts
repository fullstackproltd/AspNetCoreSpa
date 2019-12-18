import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModule, renderModuleFactory } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode } from '@angular/core';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { createServerRenderer } from 'aspnet-prerendering';
export { AppServerModule } from './app/app.server.module';
import { COOKIES } from '@app/models';

// This allows to set cookies on server
// Only cookie used in this app is culture cookie
import * as xhr2 from 'xhr2';
xhr2.prototype._restrictedHeaders = {};

enableProdMode();

export default createServerRenderer(params => {
    const { AppServerModule, AppServerModuleNgFactory, LAZY_MODULE_MAP } = (module as any).exports;
    const options = {
        document: params.data.originalHtml,
        url: params.url,
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP),
            { provide: APP_BASE_HREF, useValue: params.baseUrl },
            { provide: 'BASE_URL', useValue: params.origin + params.baseUrl },
            { provide: COOKIES, useValue: params.data.cookies }
        ]
    };

    const renderPromise = AppServerModuleNgFactory
        ? /* AoT */ renderModuleFactory(AppServerModuleNgFactory, options)
        : /* dev */ renderModule(AppServerModule, options);

    return renderPromise.then(html => {
        return {
            html
        };
    });

});
