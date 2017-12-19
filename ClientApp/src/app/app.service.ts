import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { DataService } from './core/services/data.service';

const APP_DATA_KEY = makeStateKey<string>('appData');

@Injectable()
export class AppService {
    constructor(
        @Inject('BASE_URL') private baseUrl: string,
        private transferState: TransferState,
        private dataService: DataService) { }


    public get appData(): IApplicationConfig {
        return this.transferState.get(APP_DATA_KEY, null as IApplicationConfig);
    }
    getAppData(): Promise<IApplicationConfig> {
        const transferredAppData = this.transferState.get(APP_DATA_KEY, null as IApplicationConfig);
        if (!transferredAppData) {
            return this.dataService.get(`${this.baseUrl}api/applicationdata`).toPromise()
                .then((data: IApplicationConfig) => {
                    this.transferState.set(APP_DATA_KEY, data);
                    return data;
                });
        }
        return new Promise((resolve, reject) => {
            resolve(transferredAppData);
        });
    }
}
