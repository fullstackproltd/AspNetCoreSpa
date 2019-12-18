import { Injectable } from '@angular/core';
import { NgForm, FormGroup, AbstractControl, FormArray } from '@angular/forms';

import { IFieldConfig } from '@app/models';

@Injectable()
export class FormsService {

    constructor() { }
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
    stringtoISOUTCString(dateString: string): string {
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
        return valid ? null : {
            multipleCheckboxRequireAtLeastOne: true
        };
    }
    multipleCheckboxRequireMoreThanOne(fa: FormArray) {
        let checkedCount = 0;

        for (let x = 0; x < fa.length; ++x) {
            if (fa.at(x).value) {
                checkedCount++;
            }
        }
        const valid = (checkedCount > 1);
        return valid ? null : {
            multipleCheckboxRequireMoreThanOne: true
        };
    }
    trueOrFalseValidator(fc: AbstractControl) {
        const valid = fc.value === true || fc.value === false;

        return valid ? null : { 'required': true };
    }
    numberValidator(fc: AbstractControl) {
        const value = +fc.value;
        const valid = typeof value === 'number' && !(isNaN(value));

        return valid ? null : {
            numberValidator: true
        };
    }

    numberNotZeroValidator(fc: AbstractControl) {
        const value = +fc.value;
        const valid = typeof value === 'number' && !(isNaN(value)) && value > 0;

        return valid ? null : {
            numberNotZeroValidator: true
        };
    }
    emailValidator(fc: AbstractControl) {
        const regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;

        const valid = fc.value && regex.test(fc.value);

        return valid ? null : {
            email: true
        };
    }
    // https://www.regexpal.com/?fam=104738
    telehponeValidator(fc: AbstractControl) {
        const regex = /^([\(\)\-\.\\\\/+# 0-9x]|ext|extension)+$/;

        const valid = fc.value && regex.test(fc.value);

        return valid ? null : {
            telephone: true
        };
    }

    domainValidator(fc: AbstractControl): any {
        const regex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;

        if (regex.test(fc.value)) {
            return null;
        }
        return {
            invalidDomain: true
        };
    }
    showIndicator(config) {
        return config.validation &&
            config.validation.length > 0 &&
            config.validation.some(x => {
                return this.validationExist(x);
            });
    }
    private validationExist(func) {
        const funcStr = func.toString().replace(/\s/g, '');
        const result = funcStr.indexOf('{required:') > -1 ||
            funcStr.indexOf('{\'required\':') > -1 ||
            funcStr.indexOf('multipleCheckboxesRequireOnlyOneChecked:') > -1 ||
            funcStr.indexOf('multipleCheckboxRequireAtLeastOne:') > -1 ||
            funcStr.indexOf('multipleCheckboxRequireMoreThanOne:') > -1;
        return result;
    }
}
