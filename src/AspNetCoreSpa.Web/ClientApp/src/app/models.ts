import { InjectionToken, TemplateRef } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { TableColumn } from '@swimlane/ngx-datatable';

export const COOKIES = new InjectionToken<string>('COOKIES');
export interface KeyValuePair<T> {
    key: string;
    value: T;
}

export interface ISocialLogins {
    loginProvider: string;
    providerKey: string;
    providerDisplayName: string;
    active: boolean;
}

export interface ITwoFactorModel {
    hasAuthenticator: boolean;

    recoveryCodesLeft: number;

    is2faEnabled: boolean;
}


export interface IEnableAuthenticatorModel {
    code: string;
    sharedKey: string;
    authenticatorUri: string;
}

export interface ITableColumn extends TableColumn {
    fieldType?: FieldTypes;
    fieldOptions?: IOption[];
    fieldValidations?: ValidatorFn[];
}

export interface IAppTableOptions<T> {
    title?: string;
    rows?: Array<T>;
    columns?: ITableColumn[];
    disableEditing?: boolean;
    disableFilter?: boolean;
    apiUrl?: string;
    detailsTemplate?: TemplateRef<any>;
}

export interface IModalOptions {
    title: string;
    message?: string;
    template?: any;
}
export enum FieldTypes {
    Textbox = 'input',
    FileUpload = 'file',
    Password = 'password',
    Email = 'email',
    Number = 'number',
    Date = 'date',
    Time = 'time',
    Textarea = 'textarea',
    Radiolist = 'radiolist',
    Select = 'select',
    Checkbox = 'checkbox',
    Checkboxlist = 'checkboxlist',
    Button = 'button'
}

export interface Field {
    config: IFieldConfig;
}
export interface IFieldConfig {
    name: string;
    label?: string;
    disabled?: boolean;
    options?: IOption[];
    placeholder?: string;
    type: FieldTypes;
    validation?: ValidatorFn[];
    value?: any;
    onSubmit?: Function;
    errorMessages?: Object;
}

export interface IOption {
    key: string | number;
    value: string;
    selected?: boolean;
}
