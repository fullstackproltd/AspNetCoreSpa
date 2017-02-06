import { ControlBase } from './control-base';

export class ControlCheckbox extends ControlBase<boolean> {
    public type: string;

    constructor(private options: any = {}) {
        super(options);
        this.type = 'checkbox';
        this.value = options.value || false;
    }
}
