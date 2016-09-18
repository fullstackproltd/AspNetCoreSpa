import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { LoginModel } from './login.model';
import { LoginService } from './login.service';
import { AuthService } from '../shared/services/auth.service';
import { ControlBase} from '../shared/forms/control-base';
import { ControlTextbox } from '../shared/forms/control-textbox';
import { ControlCheckbox } from '../shared/forms/control-checkbox';


@Component({
    selector: 'appc-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginModel: LoginModel;
    errors: string[];
    controls: any;

    constructor(private loginService: LoginService, private router: Router, private authService: AuthService) {
        this.loginModel = new LoginModel('', '', false);
    }

    login(model: any): void {
        this.loginModel.email = model.email;
        this.loginModel.password = model.password;
        // this.loginModel.rememberMe = model.rememberMe;
        this.loginService.login(this.loginModel)
            .subscribe((res: Response) => {
                this.authService.setAuth(res);
                this.router.navigate(['']);
            },
            (errors: string[]) => {
                this.errors = errors;
            });
    };

    ngOnInit() {
        let controls: ControlBase<any>[] = [
            new ControlTextbox({
                key: 'email',
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
            }),
            new ControlCheckbox({
                key: 'rememberMe',
                label: 'Remember me?',
                type: 'checkbox',
                value: false,
                order: 3
            })
        ];

        this.controls = controls;
    }

    loginGoogle(): void {
        this.redirect('Google');
    }

    loginFacebook(): void {
        this.redirect('Facebook');
    }

    loginMicrosoft(): void {
        this.redirect('Microsoft');
    }

    loginTwitter(): void {
        this.redirect('Twitter');
    }

    loginGithub(): void {
        this.redirect('GitHub');
    }

    loginLinkedIn(): void {
        this.redirect('LinkedIn');
    }

    redirect(provider: string): void {
        window.location.href = window.location.protocol + '//' + window.location.host + '/' + '/api/account/ExternalLogin?provider=' + provider;
    }

}
