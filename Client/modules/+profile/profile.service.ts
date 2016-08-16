import { Injectable } from '@angular/core';

import { DataService } from '../shared/services';
import { ChangePasswordModel } from './changepassword';
import { ChangeNameModel } from './changename';

@Injectable()
export class ProfileService {

    private userNameApi: string = 'api/profile/username/';
    private changePasswordApi: string = 'api/profile/changepassword/';

    constructor(private dataService: DataService) { }

    changePassword(changePasswordModel: ChangePasswordModel) {
        return this.dataService.post(this.changePasswordApi, changePasswordModel);
    }

    userName(userNameModel?: ChangeNameModel) {
        if (userNameModel) {
            return this.dataService.post(this.userNameApi, userNameModel);
        } else {
            return this.dataService.get(this.userNameApi);
        }
    }
}
