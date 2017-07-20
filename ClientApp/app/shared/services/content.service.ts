import { Injectable } from '@angular/core';

import { DataService } from '../../core/services/data.service';

@Injectable()
export class ContentService {

    constructor(public dataService: DataService) { }

    public get(lang?: string): any {
        return this.dataService.get('api/content?lang=' + (lang || 'en'));
    }
}
