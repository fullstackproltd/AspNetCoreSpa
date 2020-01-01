import { Component, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { ValueGetterParams, ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { CurrencyPipe } from '@angular/common';
import { format } from 'date-fns';

import { ActionButtonsComponent, ActionButtonComponent } from './renderers';
import { GridColumn, GridFieldType } from '../../models';
import { DateFilterComponent, DropdownFloatingFilterComponent } from './components';

@Component({
  selector: 'appc-grid',
  styleUrls: ['./grid.component.scss'],
  templateUrl: './grid.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GridComponent implements OnChanges {
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  @Input() columns: GridColumn[];
  @Input() rows: any[];
  @Input() enableCsvExport: boolean;
  gridColumns: ColDef[];

  defaultColumnDef = {
    resizable: true,
  };

  frameworkComponents = {
    actionButtons: ActionButtonsComponent,
    agDateInput: DateFilterComponent,
    customDropDownFilter: DropdownFloatingFilterComponent,
    actionButton: ActionButtonComponent,
  };

  constructor(private currencyPipe: CurrencyPipe) {}

  get rowsSelected(): boolean {
    return this.gridApi && this.gridApi.getSelectedRows() && this.gridApi.getSelectedRows().length > 0;
  }
  ngOnChanges() {
    if (this.columns) {
      this.gridColumns = this.columns.map(c => {
        const col: ColDef = {
          field: c.field,
          width: c.width,
          headerName: c.headerName,
          filter: this.getFilters.call(this, c),
          sortable: c.sortable,
          filterParams: this.getFilterParams.call(this, c),
          valueGetter: this.getValueGetter.call(this, c),
        };

        if (c.type === GridFieldType.Dropdown) {
          col.floatingFilterComponent = 'customDropDownFilter';
          col.floatingFilterComponentParams = { dropdownFilterOptions: c.dropdownFilterOptions };
        }

        if (c.type === GridFieldType.ActionButtons) {
          col.cellRenderer = 'actionButtons';
          col.cellRendererParams = {
            primaryClicked: c.cellRendererParams.primaryClicked,
            secondaryClicked: c.cellRendererParams.secondaryClicked,
            primaryLabel: c.cellRendererParams.primaryLabel,
            secondaryLabel: c.cellRendererParams.secondaryLabel,
          };
        }

        if (c.type === GridFieldType.ActionButton) {
          col.cellRenderer = 'actionButton';
          col.cellRendererParams = {
            click: c.cellRendererParams.primaryClicked,
            show: c.show,
            buttonType: c.buttonType,
            buttonText: c.cellRendererParams.primaryLabel,
          };
        }

        return col;
      });
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private getFilters(column: GridColumn): string | boolean {
    if (!column.filter) {
      return false;
    }

    switch (column.type) {
      case GridFieldType.Number:
        return 'agNumberColumnFilter';
      case GridFieldType.Date:
        return 'agDateColumnFilter';
      case GridFieldType.Text:
      default:
        return 'agTextColumnFilter';
    }
  }

  exportToCsv() {
    this.gridApi.exportDataAsCsv();
  }

  exportSelectedToCsv() {
    this.gridApi.exportDataAsCsv({ onlySelected: true });
  }

  private getFilterParams(column: GridColumn) {
    switch (column.type) {
      case GridFieldType.Date:
        return {
          // browserDatePicker: true,
          // provide comparator function
          comparator: (filterLocalDateAtMidnight, cellValue) => {
            const dateAsString = cellValue;
            if (dateAsString == null) {
              return 0;
            }
            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            const dateParts = dateAsString.split('/');
            const day = Number(dateParts[2]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[0]);
            const cellDate = new Date(day, month, year);
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          },
        };
      case GridFieldType.Number:
      default:
        return {};
    }
  }

  private getValueGetter(column: GridColumn) {
    if (column.valueGetter) {
      return column.valueGetter;
    }

    switch (column.type) {
      case GridFieldType.Number:
        return null;
      case GridFieldType.Currency:
        return (params: ValueGetterParams) => {
          return this.currencyPipe.transform(params.data[column.field], 'GBP');
        };
      case GridFieldType.Date:
        return (params: ValueGetterParams) => {
          return format(new Date(params.data[column.field]), 'dd/MM/yyyy');
        };
      default:
        return null;
    }
  }
}
