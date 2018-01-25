import { ControlBase } from './control-base';
import { NgForm } from '@angular/forms';

export class ControlCheckboxList extends ControlBase<string> {
    public type: string;

    constructor(private options: any = {}) {
        super(options);
        this.type = 'checkboxlist';
        this.value = options.value;
    }

    public updateCheckedOptions(option: any, form: NgForm) {
        const val: string[] = form.value[this.options.key];
        // Check if item already exists, then remove it
        if (val.indexOf(option) > -1) {
            val.splice(val.indexOf(option), 1);
        } else {
            val.push(option);
        }
    }

}
