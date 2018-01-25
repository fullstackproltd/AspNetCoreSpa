import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { FormControlService } from '../form-control.service';
import { ControlBase } from '../controls/control-base';

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
    @Input() public cancelText = 'Cancel'; // Default value at least
    @Input() public displayCancel = false; // By default cancel button will be hidden

    @Input() public formClass = 'form-horizontal';
    // Note: don't keep name of output events as same as native events such as submit etc.
    @Output() public onSubmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onCancel: EventEmitter<any> = new EventEmitter<any>();

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

    public submit() {
        if (this.form.valid) {
            this.formatDateToSave(this.form);
            this.onSubmit.emit(this.form.value);
        }
    }
    public cancel() {
        this.onCancel.next();
    }

    private formatDateToDisplay(model: any, controls: Array<ControlBase<any>>) {
        const dateField = controls.filter(x => x.type === 'calendar');
        if (dateField && dateField.length > 0) {
            for (const control of dateField) {
                const controlKey = control.key;
                const stringDate = model[controlKey];
                const date = new Date(stringDate);
                model[controlKey] = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
            }
        }
    }

    private formatDateToSave(form: FormGroup) {
        const dateField = this.sortedControls.filter(x => x.type === 'calendar');
        if (dateField && dateField.length > 0) {
            for (const control of dateField) {
                const controlKey = control.key;
                const objectDate = this.form.value[controlKey];
                const date = new Date(objectDate.year, objectDate.month - 1, objectDate.day);
                this.form.value[controlKey] = date;
            }
        }
    }

    ngOnDestroy() {
        this.reset.unsubscribe();
    }
}
