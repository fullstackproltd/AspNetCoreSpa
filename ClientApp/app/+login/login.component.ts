import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from '../core/models/login-model';
import { AccountService } from '../core/account/account.service';
import { ControlBase } from '../shared/forms/control-base';
import { ControlTextbox } from '../shared/forms/control-textbox';
import { UtilityService } from '../core/services/utility.service';

@Component({
    selector: 'appc-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    public loginModel: LoginModel;
    public errors: string[] = [];
    public controls: any;

    constructor(
        public accountService: AccountService,
        public router: Router,
        public utilityService: UtilityService
    ) { }

    public login(model: LoginModel): void {
        this.errors = [];
        this.accountService.login(model)
            .subscribe(() => {
                this.utilityService.navigate('');
            },
            (errors: any) => {
                this.errors.push(errors['error_description']);
            });
    };

    public ngOnInit() {
        const controls: Array<ControlBase<any>> = [
            new ControlTextbox({
                key: 'username',
                label: 'Email',
                placeholder: 'Email',
                value: '',
                type: 'email',
                required: true,
                order: 1
            }),
            new ControlTextbox({
                key: 'password',
                label: 'Password',
                placeholder: 'Password',
                value: '',
                type: 'password',
                required: true,
                order: 2
            })
        ];

        this.controls = controls;
    }
}
