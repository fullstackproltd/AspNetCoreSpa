import { TemplateRef } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

export interface IAppTableOptions<T> {
    title?: string;
    rows: Array<T>;
    columns?: TableColumn[];
    disableEditing?: boolean;
    apiUrl?: string;
    detailsTemplate?: TemplateRef<any>;
}
