import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class AppCalendarHeaderComponent {
  @Input()
  view: string;

  @Input()
  viewDate: Date;

  @Input()
  locale = 'en';

  @Output()
  viewChange: EventEmitter<string> = new EventEmitter();

  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter();
}
