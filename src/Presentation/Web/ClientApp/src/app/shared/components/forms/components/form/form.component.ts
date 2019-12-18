import { Component, Input, OnChanges, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm, FormArray } from '@angular/forms';

import { FieldTypes, IFieldConfig } from '@app/models';

@Component({
    exportAs: 'appForm',
    selector: 'app-form',
    styleUrls: ['form.component.scss'],
    templateUrl: './form.component.html'
})
export class AppFormComponent implements OnChanges, OnInit, AfterViewInit {
    @ViewChild('formRef', { static: true }) ngForm: NgForm;
    @Input() config: IFieldConfig[] = [];
    @Input() model: any;
    @Input() fullWidth: boolean;
    form: FormGroup;

    get controls() { return this.config.filter(({ type }) => type !== FieldTypes.Button); }
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }
    get submitted() { return this.ngForm.submitted; }

    constructor(private fb: FormBuilder) { }
    ngOnInit() {
        this.form = this.createGroup();
    }

    ngAfterViewInit() {
        if (this.model) {
            setTimeout(() => {
                this.form.patchValue(this.model);
            }, 0);
        }
    }
    ngOnChanges() {
        if (this.form) {
            const controls = Object.keys(this.form.controls);
            const configControls = this.controls.map((item) => item.name);

            controls
                .filter((control) => !configControls.includes(control))
                .forEach((control) => this.form.removeControl(control));

            configControls
                .filter((control) => !controls.includes(control))
                .forEach((name) => {
                    const config = this.config.find((control) => control.name === name);
                    this.form.addControl(name, this.createControl(config));
                });
        }
    }
    createGroup() {
        const group = this.fb.group({});
        this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
        return group;
    }
    createControl(config: IFieldConfig): FormControl | FormArray {
        const { disabled, validation, value, options } = config;
        if (config.type === FieldTypes.Checkboxlist) {
            return this.fb.array(
                options.map((item, index) => {
                    return this.fb.control(item.selected);
                }), config.validation ? config.validation[0] : null
            );
        }
        return this.fb.control({ disabled, value }, validation);
    }
    setDisabled(name: string, disable: boolean) {
        if (this.form.controls[name]) {
            const method = disable ? 'disable' : 'enable';
            this.form.controls[name][method]();
            return;
        }

        this.config = this.config.map((item) => {
            if (item.name === name) {
                item.disabled = disable;
            }
            return item;
        });
    }
    setValue(name: string, value: any) {
        this.form.controls[name].setValue(value, { emitEvent: true });
    }
    reset() {
        this.ngForm.resetForm();
    }
    validate() {
        Object.keys(this.form.controls).forEach(field => {
            const control = this.form.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }
}
