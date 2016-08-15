import { Component, Input, Output, EventEmitter }  from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlBase, FormControlService } from './controls';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent {

    @Input() controls: ControlBase<any>[] = [];
    @Input() btnText: string = 'Submit'; // Default value at least
    @Input() formClass: string = 'form-horizontal';
    // Note: don't keep name of output events as same as native events such as submit etc.
    @Output() formsubmit: EventEmitter<any> = new EventEmitter<any>();
    form: FormGroup;
    payLoad = '';

    constructor(private _controlService: FormControlService) { }

    ngOnInit() {
        let sortedControls = this.controls.sort((a, b) => a.order - b.order);
        this.form = this._controlService.toControlGroup(sortedControls);
    }

    onSubmit() {
        this.formsubmit.emit(this.form.value);
    }
}
