import { Injectable } from '@angular/core';

import { DataService } from '../shared/services/data.service';
import { LoginModel } from './login.model';
import { User } from '../shared/models/user.model';

@Injectable()
export class LoginService {

    private accountLoginApi: string = 'api/account/login/';

    constructor(public accountService: DataService) { }

    login(creds: LoginModel) {
        return this.accountService.post(this.accountLoginApi, creds);
    }

}
