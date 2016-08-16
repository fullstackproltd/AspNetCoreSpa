import { ControlBase } from './';

export class ControlDropdown extends ControlBase<string> {
    controlType = 'dropdown';
    options: { key: string, value: string }[] = [];

    constructor(options: any = {}) {
        super(options);
        this.options = options.options || [];
    }
}
