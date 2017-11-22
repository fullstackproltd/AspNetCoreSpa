import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';

@Injectable()
export class ContentService {

    constructor(private dataService: DataService) { }

    public get(): Observable<StringMap> {
        return this.dataService.get<StringMap>(`api/content`);
    }

}
