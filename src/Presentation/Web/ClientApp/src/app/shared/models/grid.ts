export enum GridFieldType {
  Text,
  Number,
  Boolean,
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
  field?: string;
  headerName?: string;
  filter?: boolean;
  sortable?: boolean;
  type?: GridFieldType;
  dropdownFilterOptions?: any[];
  width?: number;
  valueGetter?: any;
  cellRenderer?: any;
  cellRendererParams?: { primaryClicked?; secondaryClicked?; primaryLabel?; secondaryLabel? };
  filterParams?: any;
  show?: any;
  buttonType?: ButtonType;
}
