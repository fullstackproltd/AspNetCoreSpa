import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { format } from 'date-fns';

import { IFieldConfig, Field } from '@app/models';
import { AppFormComponent } from '../form';
import { FormsService } from '../../forms.service';

@Injectable()
export abstract class FieldBaseComponent implements Field {
    config: IFieldConfig;
    constructor(
        public fc: AppFormComponent,
        private formService: FormsService) { }
    get formGroup(): FormGroup {
        return this.fc.form;
    }

    showAsterisk(config: IFieldConfig): boolean {
        return this.formService.showIndicator(config);
    }

    formatDate(date: string): string {
        // formats like 22/10/
        // docs
        // https://date-fns.org/v1.29.0/docs/format
        return JSON.stringify(format(date, 'DD/MM/YYYY'));
    }
}
