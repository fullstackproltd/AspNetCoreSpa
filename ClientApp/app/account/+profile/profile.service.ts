import { Injectable } from '@angular/core';

import { DataService } from '../../core/services/data.service';

@Injectable()
export class ProfileService {
    public profileUrl = 'api/profile/';

    constructor(public dataService: DataService) { }

}
