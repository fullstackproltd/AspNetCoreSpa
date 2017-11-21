import { ControlBase } from './control-base';

export class ControlCheckbox extends ControlBase<boolean> {

    public options: Array<{ key: string, value: string }> = [];

    constructor(options: any = {}) {
        super(options);
        this.type = 'checkbox';
        this.value = options.value || false;
    }
}
