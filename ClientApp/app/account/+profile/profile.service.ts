import { Injectable } from '@angular/core';

import { DataService } from '../../core';

@Injectable()
export class ProfileService {
    public profileUrl = 'api/profile/';

    constructor(public dataService: DataService) { }

}
