import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterModel } from '../register.model';
import { RegisterService } from '../register.service';
import { ControlBase } from '../../shared/forms/control-base';
import { ControlTextbox } from '../../shared/forms/control-textbox';

@Component({
    selector: 'appc-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    registerModel: RegisterModel;
    private errors: string[];
    private controls: ControlBase<any>[];

    constructor(public registerService: RegisterService, public router: Router, private route: ActivatedRoute) {
        this.registerModel = new RegisterModel('', '', '', '', '');
    }

    register(model: any): void {
        this.registerModel.username = model.username;
        this.registerModel.email = model.email;
        this.registerModel.firstname = model.firstname;
        this.registerModel.lastname = model.lastname;
        this.registerModel.password = model.password;
        this.registerService.register(this.registerModel)
            .subscribe((res: Response) => {
                this.router.navigate(['../registerconfirmation'], { relativeTo: this.route, queryParams: { emailConfirmed: true } });
            },
            (errors: string[]) => {
                this.errors = errors;
            });
    };

    ngOnInit() {
        let controls: ControlBase<any>[] = [
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
