export enum GridFieldType {
  Text,
  Number,
  Currency,
  Date,
  Dropdown,
  ActionButtons,
  ActionButton,
}

export enum ButtonType {
  Primary,
  Secondary,
  Success,
  Warning,
  Danger,
}

export interface GridColumn {
  field: string;
  headerName?: string;
  filter?: boolean;
  type?: GridFieldType;
  dropdownFilterOptions?: any[];
  width?: number;
  valueGetter?: any;
  cellRenderer?: any;
  cellRendererParams?: any;
  filterParams?: any;
  primaryAction?: any;
  secondaryAction?: any;
  show?: any;
  text?: string;
  buttonType?: ButtonType;
}
