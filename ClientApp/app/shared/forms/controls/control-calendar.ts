import { ControlBase } from './control-base';

export class ControlCalendar extends ControlBase<any> {
    constructor(options: any = {}) {
        super(options);
        this.type = options.type || 'calendar';
        // this.value = this.value ? this.formatDate(new Date(this.value)) : '';
    }

    // private formatDate(date: Date) {
    //     return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    // }
}
