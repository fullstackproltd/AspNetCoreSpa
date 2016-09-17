import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ControlBase } from './control-base';

@Injectable()
export class FormControlService {
    constructor() { }

    toControlGroup(controls: ControlBase<any>[]) {
        let group: any = {};

        controls.forEach(control => {
            group[control.key] = control.required ?
                new FormControl(control.value || '', Validators.required)
                : new FormControl(control.value || '');
        });

        return new FormGroup(group);
    }
}
