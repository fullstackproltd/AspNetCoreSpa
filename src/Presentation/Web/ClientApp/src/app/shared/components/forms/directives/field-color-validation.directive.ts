import { Directive, Self, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

import { AppFormComponent } from '../components';

@Directive({
  selector: '[formControlName]:not(.checkbox-list-item),[ngModel]:not([ngbTypeahead]),[formControl]',
})
export class FieldColorValidationDirective {
  public constructor(@Self() private control: NgControl, private formComponent: AppFormComponent) {}

  @HostBinding('class.is-valid')
  get ngClassValid(): boolean {
    return this.control.control && this.control.control.valid && (this.control.control.touched || this.formComponent.submitted);
  }

  @HostBinding('class.is-invalid')
  get ngClassInvalid(): boolean {
    return this.control.control && this.control.control.invalid && (this.control.control.touched || this.formComponent.submitted);
  }
}
