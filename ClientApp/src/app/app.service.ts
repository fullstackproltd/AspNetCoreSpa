import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
    constructor(private httpClient: HttpClient, ) { }
    getData(): Promise<any> {
        return new Promise((resolve) => {
            this.httpClient.get<any>('http://localhost:5000/api/applicationdata')
                .subscribe(res => {
                    // console.log(res);
                    (<any>window).appData = {
                        content: JSON.parse(res.content),
                        cultures: res.cultureItems,
                        loginProviders: res.loginProviders
                    };
                    resolve(res);

                });
        });
    }
}
