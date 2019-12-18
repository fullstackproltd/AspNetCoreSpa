import { Component } from '@angular/core';

import { FieldBaseComponent } from '../field-base';

@Component({
    selector: 'app-form-checkbox-list',
    styleUrls: ['form-checkbox-list.component.scss'],
    templateUrl: 'form-checkbox-list.component.html'
})
export class FormCheckboxListComponent extends FieldBaseComponent {
    get controls() {
        return (<any>this.formGroup.controls[this.config.name]).controls;
    }
}
