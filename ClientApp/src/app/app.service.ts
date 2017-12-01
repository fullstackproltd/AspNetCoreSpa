import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
    constructor(
        @Inject('BASE_URL') private baseUrl: string,
        private httpClient: HttpClient
    ) { }
    getData(): Promise<any> {
        return new Promise((resolve) => {
            this.httpClient.get<any>(`${this.baseUrl}api/applicationdata`)
                .subscribe(res => {
                    resolve(res);
                    // console.log(res);
                    // (<any>window).appData = {
                    //     content: JSON.parse(res.content),
                    //     cultures: res.cultureItems,
                    //     loginProviders: res.loginProviders
                    // };
                });
        });
    }
}
