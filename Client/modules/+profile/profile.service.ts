import { Injectable } from '@angular/core';

import { DataService } from '../shared/services/data.service';
import { ChangePasswordModel } from './changepassword/change-password.model';
import { ChangeNameModel } from './changename/change-name.model';

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
