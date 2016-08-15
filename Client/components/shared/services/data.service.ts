import { Injectable } from '@angular/core';

import { ApiGateway } from './apiGateway.service';

@Injectable()
export class DataService {

    constructor(public http: ApiGateway) { }

    get(url: string, params?: any) {
        return this.http.get(url, undefined);
    }

    post(url: string, data: any, params?: any) {
        return this.http.post(url, data, params);
    }
}
