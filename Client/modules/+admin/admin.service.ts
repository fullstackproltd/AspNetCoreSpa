import { Injectable } from '@angular/core';

import { DataService } from '../shared/services';

@Injectable()
export class AdminService {

    private adminApiUrl: string = 'api/admin/doadminoperation/';

    constructor(private dataService: DataService) { }

    do() {
        return this.dataService.get(this.adminApiUrl);
    }

}
