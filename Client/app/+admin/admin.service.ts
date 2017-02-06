import { Injectable } from '@angular/core';

import { DataService } from '../shared/services/data.service';

@Injectable()
export class AdminService {

    public adminApiUrl: string = 'api/admin/doadminoperation/';

    constructor(public dataService: DataService) { }

    public do() {
        return this.dataService.get(this.adminApiUrl);
    }

}
