﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ControlBase } from '../../../shared/forms/controls/control-base';
import { ControlTextbox } from '../../../shared/forms/controls/control-textbox';
import { DataService } from '../../../core/services/data.service';
import { AccountClient, RegisterViewModel } from '../../../../apiDefinitions';


@Component({
    selector: 'appc-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    public controls: Array<ControlBase<any>>;

    constructor(
        public dataService: DataService,
        public router: Router,
        public route: ActivatedRoute,
        public accountClient: AccountClient
    ) { }

    public register(model: RegisterViewModel): void {
        this.accountClient.register(model, null)
            .subscribe(() => {
                this.router.navigate(['../registerconfirmation'], { relativeTo: this.route, queryParams: { emailConfirmed: true } });
            });
        // this.dataService.post('api/account/register', model)
        //     .subscribe(() => {
        //         this.router.navigate(['../registerconfirmation'], { relativeTo: this.route, queryParams: { emailConfirmed: true } });
        //     });
    }

    public ngOnInit() {
        const controls: Array<ControlBase<any>> = [
            new ControlTextbox({
                key: 'username',
                label: 'Username',
                placeholder: 'Username',
                value: '',
                type: 'text',
                required: true,
                order: 1
            }),
            new ControlTextbox({
                key: 'firstname',
                label: 'Firstname',
                placeholder: 'Firstname',
                value: '',
                type: 'text',
                required: true,
                order: 2
            }),
            new ControlTextbox({
                key: 'lastname',
                label: 'Lastname',
                placeholder: 'Lastname',
                value: '',
                type: 'text',
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
            }),
            new ControlTextbox({
                key: 'mobile',
                label: 'Mobile',
                placeholder: 'Mobile',
                value: '',
                type: 'text',
                required: true,
                order: 6
            })
        ];

        this.controls = controls;
    }

}
