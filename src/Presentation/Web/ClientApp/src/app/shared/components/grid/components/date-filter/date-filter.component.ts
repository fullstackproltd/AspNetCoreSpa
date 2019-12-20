import { Component } from '@angular/core';
import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { IDateParams } from 'ag-grid-community';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent {
  private date: Date;
  private params: any;

  agInit(params: IDateParams): void {
    this.params = params;
  }

  onDateChanged(selectedDate: NgbDateStruct) {
    this.date = selectedDate && new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    this.params.onDateChanged();
  }

  getDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date || null;
  }

  clear(dp: NgbInputDatepicker) {
    dp.writeValue(null);
    this.setDate(null);
    this.params.onDateChanged();
  }
}
