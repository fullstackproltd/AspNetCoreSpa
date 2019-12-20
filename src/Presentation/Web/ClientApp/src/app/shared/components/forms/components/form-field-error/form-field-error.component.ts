import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { IFieldConfig } from '../../../../models';
import { AppFormComponent } from '../form';

@Component({
  selector: 'app-form-field-error, [appFormFieldError]',
  styleUrls: ['./form-field-error.component.scss'],
  templateUrl: 'form-field-error.component.html',
})
export class FormFieldErrorComponent implements OnInit {
  @Input() public fieldConfig: IFieldConfig;
  constructor(public formComponent: AppFormComponent) {}
  ngOnInit() {}

  errorMessage(): string {
    const control: AbstractControl = this.formComponent.form.get(this.fieldConfig.name);
    if (control) {
      for (const errorCode in control.errors) {
        if (control.errors.hasOwnProperty(errorCode) && (control.touched || this.formComponent.submitted)) {
          return this.getErrorText(errorCode);
        }
      }
    }
    return '';
  }

  private getErrorText(code: string) {
    const config: any = {
      required: 'Field is required',
      minlength: 'Invalid minimum length',
      maxlength: 'Invalid maximum length',
      email: 'Invalid email address',
      telephone: 'Invalid telephone number',
      date: 'Invalid date entered',
      invalidDomain: 'Invalid domain name',
      invalidMoney: 'Invalid amount entered',
      invalidPostcode: 'Invalid postcode',
      numberValidator: 'Invalid number',
      numberNotZeroValidator: 'Number greater than 0 required',
      multipleCheckboxRequireAtLeastOne: 'At least one option required',
      multipleCheckboxRequireMoreThanOne: 'More than one options required',
    };
    return (this.fieldConfig.errorMessages && this.fieldConfig.errorMessages[code]) || config[code];
  }
}
