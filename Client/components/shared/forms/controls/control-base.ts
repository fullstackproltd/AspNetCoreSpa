export class ControlBase<T>{
    value: T;
    key: string;
    label: string;
    placeholder: string;
    required: boolean;
    order: number;
    controlType: string;
    class: string;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        placeholder?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        class?: string;
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.placeholder = options.placeholder || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.class = options.class || '';
    }
}
