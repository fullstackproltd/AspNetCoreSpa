import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModule, renderModuleFactory } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode } from '@angular/core';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { createServerRenderer } from 'aspnet-prerendering';
import { APP_DATA } from './app/appData';
export { AppServerModule } from './app/app.server.module';
const { AppServerModule, AppServerModuleNgFactory, LAZY_MODULE_MAP } = (module as any).exports;

enableProdMode();


export default createServerRenderer(params => {
    // console.log('=========================================================================================================================');
    // console.log(getAppData());
    // console.log('=========================================================================================================================');
    const options = {
        document: params.data.originalHtml,
        url: params.url,
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP),
            { provide: APP_BASE_HREF, useValue: params.baseUrl },
            { provide: APP_DATA, useValue: params.data.appData },
            { provide: 'BASE_URL', useValue: params.origin + params.baseUrl },
        ]
    };

    const renderPromise = AppServerModuleNgFactory
        ? /* AoT */ renderModuleFactory(AppServerModuleNgFactory, options)
        : /* dev */ renderModule(AppServerModule, options);

    return renderPromise.then(html => {
        html = html.replace('$$script$$', `<script type="text/javascript">window.appData = ${params.data.appData}</script>`);
        return {
            html
        };
    });

});
