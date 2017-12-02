import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { UtilityService } from '../../core/services/utitlity.service';
import { ControlBase } from '../../shared/forms/controls/control-base';
import { ControlTextbox } from '../../shared/forms/controls/control-textbox';

@Component({
    selector: 'appc-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    public loginModel: ILoginModel;
    public controls: any;

    constructor(
        public oAuthService: OAuthService,
        private us: UtilityService
    ) { }
    public login(model: ILoginModel): void {
        this.oAuthService.fetchTokenUsingPasswordFlow(model.username, model.password)
            .then((x: any) => {
                localStorage.setItem('id_token', x.id_token);
                this.oAuthService.setupAutomaticSilentRefresh();
                this.us.navigate('');
            });
    }

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
