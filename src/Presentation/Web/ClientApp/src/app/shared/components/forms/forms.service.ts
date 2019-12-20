import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { NgForm, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { IFieldConfig } from '../../models';

@Injectable()
export class FormsService {
  POSTCODE_REGEX = /^(([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? ?){1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/i;
  MONEY_REGEX = /^\d{1,18}(\.\d{1,2})?$/;
  EMAIL_REGEX = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;
  TELEPHONE_REGEX = /^([\(\)\-\.\\\\/+# 0-9x]|ext|extension)+$/;
  DOMAIN_REGEX = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;

  constructor() {}

  valid(form: FormGroup, fieldConfig: IFieldConfig, formRef: NgForm) {
    if (form.controls[fieldConfig.name]) {
      const valid = form.controls[fieldConfig.name].valid && (form.controls[fieldConfig.name].touched || formRef.submitted);
      return valid;
    }
  }
  invalid(form: FormGroup, fieldConfig: IFieldConfig, formRef: NgForm) {
    return !form.controls[fieldConfig.name].valid && (form.controls[fieldConfig.name].touched || formRef.submitted);
  }

  dateValidator(control: AbstractControl) {
    if (control.value) {
      const date = new Date(control.value);
      const valid = date instanceof Date && !isNaN(date.valueOf());
      return valid ? undefined : { date: true };
    }
    return { date: true };
  }
  stringToIsoUtcString(dateString: string): string {
    if (dateString) {
      const isoString = new Date(dateString).toISOString();
      return isoString;
    }
    return '';
  }
  multipleCheckboxRequireAtLeastOne(fa: FormArray) {
    let valid = false;

    for (let x = 0; x < fa.length; ++x) {
      if (fa.at(x).value) {
        valid = true;
        break;
      }
    }
    return valid
      ? null
      : {
          multipleCheckboxRequireAtLeastOne: true,
        };
  }
  multipleCheckboxRequireMoreThanOne(fa: FormArray) {
    let checkedCount = 0;

    for (let x = 0; x < fa.length; ++x) {
      if (fa.at(x).value) {
        checkedCount++;
      }
    }
    const valid = checkedCount > 1;
    return valid
      ? null
      : {
          multipleCheckboxRequireMoreThanOne: true,
        };
  }
  trueOrFalseValidator(fc: AbstractControl) {
    const valid = fc.value === true || fc.value === false;

    return valid ? null : { required: true };
  }
  numberValidator(fc: AbstractControl) {
    const value = +fc.value;
    const valid = typeof value === 'number' && !isNaN(value);

    return valid
      ? null
      : {
          numberValidator: true,
        };
  }

  numberNotZeroValidator(fc: AbstractControl) {
    const value = +fc.value;
    const valid = typeof value === 'number' && !isNaN(value) && value > 0;

    return valid
      ? null
      : {
          numberNotZeroValidator: true,
        };
  }

  emailValidator = (fc: AbstractControl) => {
    const valid = fc.value && this.EMAIL_REGEX.test(fc.value);

    return valid
      ? null
      : {
          email: true,
        };
  };
  // https://www.regexpal.com/?fam=104738
  telehponeValidator = (fc: AbstractControl) => {
    const valid = fc.value && this.TELEPHONE_REGEX.test(fc.value);

    return valid
      ? null
      : {
          telephone: true,
        };
  };

  domainValidator = (fc: AbstractControl): any => {
    if (this.DOMAIN_REGEX.test(fc.value)) {
      return null;
    }
    return {
      invalidDomain: true,
    };
  };

  postcodeValidator = (control: AbstractControl): any => {
    const valid = this.POSTCODE_REGEX.test(control.value);
    return valid
      ? null
      : {
          invalidPostcode: true,
        };
  };

  moneyValidator = (control: AbstractControl): any => {
    const valid = this.MONEY_REGEX.test(control.value);
    return valid
      ? null
      : {
          invalidMoney: true,
        };
  };

  requiredFileType(type: string) {
    return function(control: AbstractControl) {
      const file = control.value;
      if (file) {
        const extension = file.name.split('.')[1].toLowerCase();
        if (type.toLowerCase() !== extension.toLowerCase()) {
          return {
            requiredFileType: true,
          };
        }
        return null;
      }
      return null;
    };
  }

  showIndicator(config) {
    return (
      config.validation &&
      config.validation.length > 0 &&
      config.validation.some(x => {
        return this.validationExist(x);
      })
    );
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  uploadProgress<T>(cb: (progress: number) => void) {
    return tap((event: HttpEvent<T>) => {
      if (event.type === HttpEventType.UploadProgress) {
        cb(Math.round((100 * event.loaded) / event.total));
      }
    });
  }

  private validationExist(func) {
    const funcStr = func.toString().replace(/\s/g, '');
    const result =
      funcStr.indexOf('{required:') > -1 ||
      funcStr.indexOf("{'required':") > -1 ||
      funcStr.indexOf('multipleCheckboxesRequireOnlyOneChecked:') > -1 ||
      funcStr.indexOf('multipleCheckboxRequireAtLeastOne:') > -1 ||
      funcStr.indexOf('multipleCheckboxRequireMoreThanOne:') > -1;
    return result;
  }
}
