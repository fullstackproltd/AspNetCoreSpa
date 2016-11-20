import { ControlBase } from './control-base';

export class ControlCheckbox extends ControlBase<boolean> {
    type: string;

    constructor(options: any = {}) {
        super(options);
        this.type = 'checkbox';
        this.value = options.value || false;
    }
}
