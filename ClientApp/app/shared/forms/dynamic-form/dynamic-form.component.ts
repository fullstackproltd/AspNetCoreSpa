import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { ControlBase } from '../controls';
import { FormControlService } from '../form-control.service';

@Component({
    selector: 'appc-dynamic-form',
    styleUrls: ['./dynamic-form.component.scss'],
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit, OnDestroy {
    private sortedControls: Array<ControlBase<any>>;

    @Input() public controls: Array<ControlBase<any>> = [];
    @Input() public reset = new Subject<boolean>();
    @Input() public data: Subject<any>;
    @Input() public btnText = 'Save'; // Default value at least
    @Input() public formClass = 'form-horizontal';
    // Note: don't keep name of output events as same as native events such as submit etc.
    @Output() public formsubmit: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('formDir') public formDir: NgForm;
    public form: FormGroup;

    constructor(public _controlService: FormControlService) { }

    public ngOnInit() {
        this.sortedControls = this.controls.sort((a, b) => a.order - b.order);
        this.form = this._controlService.toControlGroup(this.sortedControls);

        if (this.data) {
            this.data.subscribe(model => {
                if (model) {
                    this.formatDateToDisplay(model, this.sortedControls);
                    this.form.patchValue(model);
                }
            });
        }

        this.reset.subscribe(reset => {
            if (reset) {
                this.formDir.resetForm();
            }
        });

    }

    public onSubmit() {
        if (this.form.valid) {
            this.formatDateToSave(this.form);
            this.formsubmit.emit(this.form.value);
        }
    }

    private formatDateToDisplay(model: any, controls: Array<ControlBase<any>>) {
        const dateField = controls.filter(x => x.type === 'calendar');
        if (dateField && dateField.length > 0) {
            const controlKey = dateField[0].key;
            const stringDate = model[controlKey];
            const date = new Date(stringDate);
            model[controlKey] = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
        }
    }

    private formatDateToSave(form: FormGroup) {
        const dateField = this.sortedControls.filter(x => x.type === 'calendar');
        if (dateField && dateField.length > 0) {
            const controlKey = dateField[0].key;
            const objectDate = this.form.value[controlKey];
            const date = new Date(objectDate.year, objectDate.month - 1, objectDate.day);
            this.form.value[controlKey] = date;
        }
    }

    ngOnDestroy() {
        this.reset.unsubscribe();
    }
}
