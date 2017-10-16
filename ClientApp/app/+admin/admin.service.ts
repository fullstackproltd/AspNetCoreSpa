import { Injectable } from '@angular/core';

import { DataService } from '../core/services/data.service';

@Injectable()
export class AdminService {
    public adminApiUrl = 'api/admin/doadminoperation/';

    constructor(public dataService: DataService) { }

    public do() {
        return this.dataService.get(this.adminApiUrl);
    }

}
