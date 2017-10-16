﻿import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterModel } from '../../../core/models/register-model';
import { ControlBase } from '../../../shared/forms/control-base';
import { ControlTextbox } from '../../../shared/forms/control-textbox';
import { AccountService } from '../../../core/services/account.service';

@Component({
    selector: 'appc-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    public errors: string[] = [];
    public controls: Array<ControlBase<any>>;

    constructor(public accountService: AccountService, public router: Router, public route: ActivatedRoute) { }

    public register(model: RegisterModel): void {
        this.accountService.register(model)
            .subscribe((res: Response) => {
                this.router.navigate(['../registerconfirmation'], { relativeTo: this.route, queryParams: { emailConfirmed: true } });
            },
            (errors: string[]) => {
                this.errors = errors;
            });
    };

    public ngOnInit() {
        const controls: Array<ControlBase<any>> = [
            new ControlTextbox({
                key: 'username',
                label: 'Username',
                placeholder: 'Username',
                value: '',
                type: 'textbox',
                required: true,
                order: 1
            }),
            new ControlTextbox({
                key: 'firstname',
                label: 'Firstname',
                placeholder: 'Firstname',
                value: '',
                type: 'textbox',
                required: true,
                order: 2
            }),
            new ControlTextbox({
                key: 'lastname',
                label: 'Lastname',
                placeholder: 'Lastname',
                value: '',
                type: 'textbox',
                required: true,
                order: 3
            }),
            new ControlTextbox({
                key: 'email',
                label: 'Email',
                placeholder: 'Email',
                value: '',
                type: 'email',
                required: true,
                order: 4
            }),
            new ControlTextbox({
                key: 'password',
                label: 'Password',
                placeholder: 'Password',
                value: '',
                type: 'password',
                required: true,
                order: 5
            })
        ];

        this.controls = controls;
    }

}
