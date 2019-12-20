import { ValidatorFn } from '@angular/forms';

export enum FieldTypes {
  Textbox = 'input',
  InputGroup = 'inputgroup',
  FileUpload = 'file',
  FilePathUpload = 'filepath',
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
  Button = 'button',
  ButtonGroup = 'buttongroup',
}

export interface Field {
  config: IFieldConfig;
}
export interface IFieldConfig {
  name: string;
  label?: string;
  cancelButtonLabel?: string;
  disabled?: boolean;
  options?: FieldOption[];
  placeholder?: string;
  type: FieldTypes;
  cssClass?: string;
  focus?: boolean;
  validation?: ValidatorFn[];
  value?: any;
  hidden?: boolean;
  tooltip?: string;
  onSubmit?: Function;
  onCancel?: Function;
  errorMessages?: Object;
  inputGroupAddonLabel?: string;
  inputGroupAddonHandler?: Function;
  onSelectChange?: Function;
}

export interface FieldOption {
  key: string | number;
  value: string;
  selected?: boolean;
}
