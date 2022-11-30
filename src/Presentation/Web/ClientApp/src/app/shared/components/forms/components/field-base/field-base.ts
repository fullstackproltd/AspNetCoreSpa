import { Injectable, Directive } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { IFieldConfig, Field } from '../../../../models';
import { AppFormComponent } from '../form';
import { FormsService } from '../../forms.service';

@Directive()
@Injectable()
export abstract class FieldBaseComponent implements Field {
  config: IFieldConfig;

  constructor(public fc: AppFormComponent, public formService: FormsService) {}

  get formGroup(): UntypedFormGroup {
    return this.fc.form;
  }

  showAsterisk(config: IFieldConfig): boolean {
    return this.formService.showIndicator(config);
  }
}
