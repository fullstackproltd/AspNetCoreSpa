import { Directive, Self, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

import { AppFormComponent } from '../components';

@Directive({
    selector: '[formControlName]:not(.checkbox-list-item),[ngModel],[formControl]'
})
export class FieldColorValidationDirective {

    public constructor(@Self() private control: NgControl, private formComponent: AppFormComponent) { }

    @HostBinding('class.is-valid')
    get ngClassValid(): boolean {
        if (this.control.control == null) {
            return false;
        }
        return this.control.control.valid && (this.control.control.touched || this.formComponent.submitted);
    }

    @HostBinding('class.is-invalid')
    get ngClassInvalid(): boolean {
        if (this.control.control == null) {
            return false;
        }
        return this.control.control.invalid && (this.control.control.touched || this.formComponent.submitted);
    }

}
