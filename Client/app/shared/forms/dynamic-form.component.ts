import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlBase } from './control-base';
import { FormControlService } from './form-control.service';

@Component({
    selector: 'appc-dynamic-form',
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

    @Input() public controls: Array<ControlBase<any>> = [];
    @Input() public btnText = 'Submit'; // Default value at least
    @Input() public formClass = 'form-horizontal';
    // Note: don't keep name of output events as same as native events such as submit etc.
    @Output() public formsubmit: EventEmitter<any> = new EventEmitter<any>();
    public form: FormGroup;

    constructor(public _controlService: FormControlService) { }

    public ngOnInit() {
        const sortedControls = this.controls.sort((a, b) => a.order - b.order);
        this.form = this._controlService.toControlGroup(sortedControls);
    }

    public onSubmit() {
        this.formsubmit.emit(this.form.value);
    }
}
