import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ControlBase } from '../../../shared/forms/controls/control-base';
import { ControlTextbox } from '../../../shared/forms/controls/control-textbox';
import { DataService } from '../../../core/services/data.service';


@Component({
    selector: 'appc-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    public controls: Array<ControlBase<any>>;

    constructor(
        public dataService: DataService,
        public router: Router,
        public route: ActivatedRoute
    ) { }

    public register(model: IRegisterModel): void {
        this.dataService.post('api/account/register', model)
            .subscribe(() => {
                this.router.navigate(['../registerconfirmation'], { relativeTo: this.route, queryParams: { emailConfirmed: true } });
            });
    }

    public ngOnInit() {
        const controls: Array<ControlBase<any>> = [
            new ControlTextbox({
                key: 'username',
                label: 'app_username',
                placeholder: 'app_username',
                value: '',
                type: 'text',
                required: true,
                order: 1
            }),
            new ControlTextbox({
                key: 'firstname',
                label: 'app_firstname',
                placeholder: 'app_firstname',
                value: '',
                type: 'text',
                required: true,
                order: 2
            }),
            new ControlTextbox({
                key: 'lastname',
                label: 'app_lastname',
                placeholder: 'app_lastname',
                value: '',
                type: 'text',
                required: true,
                order: 3
            }),
            new ControlTextbox({
                key: 'email',
                label: 'app_email',
                placeholder: 'app_email',
                value: '',
                type: 'email',
                required: true,
                order: 4
            }),
            new ControlTextbox({
                key: 'password',
                label: 'app_password',
                placeholder: 'app_password',
                value: '',
                type: 'password',
                required: true,
                order: 5
            }),
            new ControlTextbox({
                key: 'mobile',
                label: 'app_mobile',
                placeholder: 'app_mobile',
                value: '',
                type: 'text',
                required: true,
                order: 6
            })
        ];

        this.controls = controls;
    }

}
