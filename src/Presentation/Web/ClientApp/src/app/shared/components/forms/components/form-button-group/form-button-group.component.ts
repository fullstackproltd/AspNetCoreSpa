import { Component } from '@angular/core';

import { FieldBaseComponent } from '../field-base';

@Component({
  selector: 'app-form-button-group',
  templateUrl: 'form-button-group.component.html',
})
export class FormButtonGroupComponent extends FieldBaseComponent {
  submit($event: Event) {
    $event.preventDefault();
    this.config.onSubmit(this.formGroup);
    this.fc.validate();
  }
}
