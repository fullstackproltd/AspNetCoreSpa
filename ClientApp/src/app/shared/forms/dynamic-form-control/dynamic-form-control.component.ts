import { Component, Input } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { ValidationService } from '../validation.service';
import { ControlBase } from '../controls/control-base';

@Component({
    selector: 'appc-dynamic-control',
    templateUrl: './dynamic-form-control.component.html'
})
export class DynamicFormControlComponent {
    @Input() public control: ControlBase<string | boolean>;
    @Input() public form: FormGroup;
    @Input() public frm: NgForm;

    constructor() { }

    get valid() {
        return this.form.controls[this.control.key].valid && (this.form.controls[this.control.key].touched || this.frm.submitted);
    }

    get invalid() {
        return !this.form.controls[this.control.key].valid && (this.form.controls[this.control.key].touched || this.frm.submitted);
    }

    errorMessage(control: ControlBase<any>): string {
        // valid || (pristine && !submitted)
        const c: any = this.form.get(this.control.key);
        for (const propertyName in c.errors) {
            if (c.errors.hasOwnProperty(propertyName) && (c.touched || this.frm.submitted)) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.minlength || this.control.maxlength);
            }
        }
        return '';
    }

}
