import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { ValidationService } from './validation.service';
import { ControlBase } from './controls/control-base';

@Injectable()
export class FormControlService {

    public toControlGroup(controls: Array<ControlBase<any>>) {
        const group: any = {};

        controls.forEach(control => {
            const validators: ValidatorFn[] = [];
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
                validators.push(Validators.maxLength(control.maxlength));
            }
            // Email
            if (control.type === 'email') {
                validators.push(Validators.email);
            }
            // Password
            if (control.type === 'password' && control.required) {
                validators.push(ValidationService.passwordValidator);
            }
            group[control.key] = new FormControl(control.value || '', validators);
        });

        return new FormGroup(group);
    }
}
