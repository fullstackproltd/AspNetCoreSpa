import { Component, Host, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

import { ValidationService } from './validation.service';

@Component({
    selector: 'control-error-message',
    template: `<label *ngIf="errorMessage" class="error"> {{errorMessage}} </label>`
})
export class ErrorMessageComponent {
    @Input() control: string;
    @Input() form: FormGroupDirective;
    constructor() { }

    get errorMessage() {
        let c = this.form.form.find(this.control);
        for (let propertyName in c.errors) {
            if (c.errors.hasOwnProperty(propertyName) && c.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName);
            }
        }
        return undefined;
    }
}
