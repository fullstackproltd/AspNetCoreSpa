// tslint:disable
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlBase } from './control-base';

@Component({
    selector: 'appc-dynamic-control',
    templateUrl: './dynamic-form-control.component.html'
})
export class DynamicFormControlComponent {
    @Input() public control: ControlBase<string | boolean>;
    @Input() public form: FormGroup;

    constructor() { }

    get valid() {
        return this.form.controls[this.control.key].valid;
    }

    get invalid() {
        return !this.form.controls[this.control.key].valid && this.form.controls[this.control.key].touched;
    }
}
