import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlBase }     from './control-base';
import { ErrorMessageComponent }     from './error-message.component';

@Component({
    selector: 'appc-dynamic-control',
    templateUrl: './dynamic-form-control.component.html'
})
export class DynamicFormControlComponent {
    @Input() control: ControlBase<any>;
    @Input() form: FormGroup;

    get isValid() {
        return this.form.controls[this.control.key].valid;
    }
}
