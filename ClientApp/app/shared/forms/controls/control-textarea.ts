import { ControlBase } from './control-base';

export class ControlTextarea extends ControlBase<string> {
    constructor(options: any = {}) {
        super(options);
        this.type = options.type || 'textarea';
    }
}
