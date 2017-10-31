import { ControlBase } from '../../forms';

export interface AppTableModel {
    apiUrl: string;
    columnDefs: Array<any>;
    rows: any[];
    formFields: Array<ControlBase<any>>;
    hideAdd?: boolean;
}
