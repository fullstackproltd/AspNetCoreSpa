import { Component } from '@angular/core';

import { FieldBaseComponent } from '../field-base';

@Component({
  selector: 'app-form-select',
  styleUrls: ['form-select.component.scss'],
  templateUrl: 'form-select.component.html',
})
export class FormSelectComponent extends FieldBaseComponent {
  onChange($event) {
    if (this.config.onSelectChange) {
      this.config.onSelectChange($event.target.value);
    }
  }
}
