import { Injectable } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { ChangePasswordModel } from './changepassword/change-password.model';
import { ChangeNameModel } from './changename/change-name.model';

@Injectable()
export class ProfileService {

    public userNameApi = 'api/profile/username/';
    public changePasswordApi = 'api/profile/changepassword/';

    constructor(public dataService: DataService) { }

    public changePassword(changePasswordModel: ChangePasswordModel) {
        return this.dataService.post(this.changePasswordApi, changePasswordModel);
    }

    public userName(userNameModel?: ChangeNameModel) {
        if (userNameModel) {
            return this.dataService.post(this.userNameApi, userNameModel);
        } else {
            return this.dataService.get(this.userNameApi);
        }
    }
}
