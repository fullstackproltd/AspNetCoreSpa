import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../../core';
import { UserInfoModel, UpdatePasswordModel } from './profile.models';

@Injectable()
export class ProfileService {
    public profileUrl = 'api/manage';

    constructor(public dataService: DataService) { }

    public userInfo(userInfoModel?: UserInfoModel): Observable<any> {
        const USER_INFO_URL = `${this.profileUrl}/userinfo`;
        if (userInfoModel) {
            return this.dataService.post(USER_INFO_URL, userInfoModel);
        } else {
            return this.dataService.get(USER_INFO_URL);
        }
    }
    changePassword(changePasswordModel: UpdatePasswordModel) {
        return this.dataService.post(`${this.profileUrl}/changepassword`, changePasswordModel);
    }

}
