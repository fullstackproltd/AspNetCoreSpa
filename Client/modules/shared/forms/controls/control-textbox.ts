import { ControlBase } from './';

export class ControlTextbox extends ControlBase<boolean> {
    controlType = 'textbox';
    type: string;

    constructor(options: any = {}) {
        super(options);
        this.type = options.type || '';
    }
}
