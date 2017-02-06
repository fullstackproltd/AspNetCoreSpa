import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { ControlBase } from './control-base';
import { ValidationService } from './validation.service';

@Injectable()
export class FormControlService {

    public toControlGroup(controls: Array<ControlBase<any>>) {
        let group: any = {};

        controls.forEach(control => {
            let validators: ValidatorFn[] = [];
            // Required
            if (control.required) {
                validators.push(Validators.required);
            }
            // Minlength
            if (control.minlength) {
                validators.push(Validators.minLength(control.minlength));
            }
            // Maxlength
            if (control.maxlength) {
                validators.push(Validators.minLength(control.maxlength));
            }
            // Email
            if (control.type === 'email') {
                validators.push(ValidationService.emailValidator);
            }
            // Password
            if (control.type === 'password') {
                validators.push(ValidationService.passwordValidator);
            }
            group[control.key] = new FormControl(control.value || '', validators);
        });

        return new FormGroup(group);
    }
}
