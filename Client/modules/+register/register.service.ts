import { Injectable } from '@angular/core';

import { DataService } from '../shared/services/data.service';
import { User } from '../shared/models';
import { RegisterModel } from './register.model';

@Injectable()
export class RegisterService {

    private accountRegisterApi: string = 'api/account/register/';

    constructor(private accountService: DataService) { }

    register(newUser: RegisterModel) {
        return this.accountService.post(this.accountRegisterApi, newUser);
    }

}
