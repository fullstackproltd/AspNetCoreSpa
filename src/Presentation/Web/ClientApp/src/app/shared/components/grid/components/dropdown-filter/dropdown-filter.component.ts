import { Component, HostBinding } from '@angular/core';

import { IFloatingFilter, IFloatingFilterParams, TextFilterModel, TextFilter } from 'ag-grid-community';
import { AgFrameworkComponent } from 'ag-grid-angular';

export interface DropdownFloatingFilterParams extends IFloatingFilterParams {
  value: string;
  dropdownFilterOptions: any[];
}

@Component({
  selector: 'appc-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss'],
})
export class DropdownFloatingFilterComponent implements IFloatingFilter, AgFrameworkComponent<DropdownFloatingFilterParams> {
  @HostBinding('class') class = 'ag-input-wrapper';

  private params: DropdownFloatingFilterParams;

  public dropdownFilterOptions: any[];
  public currentValue: string;

  agInit(params: DropdownFloatingFilterParams): void {
    this.params = params;
    this.dropdownFilterOptions = this.params.dropdownFilterOptions;
    this.currentValue = '';
  }

  valueChanged(value: string) {
    this.params.parentFilterInstance(instance => {
      // value could be:
      // greaterThan
      // lessThan
      // equals
      (<TextFilter>instance).onFloatingFilterChanged('equals', value);
    });
  }

  onParentModelChanged(parentModel: TextFilterModel): void {
    if (!parentModel) {
      this.currentValue = '';
    } else {
      // note that the filter could be anything here, but our purposes we're assuming a greater than filter only,
      // so just read off the value and use that
      this.currentValue = parentModel.filter;
    }
  }
}
