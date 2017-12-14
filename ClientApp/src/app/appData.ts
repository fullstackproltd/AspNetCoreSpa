import { InjectionToken } from '@angular/core';

export const APP_DATA = new InjectionToken<IApplicationConfig>('APPDATA');

export function getAppData() {
    const appData = (<any>(global || window)).appData;
    if (typeof appData === 'string') {
        return JSON.parse(appData);
    }
    return appData;
}
