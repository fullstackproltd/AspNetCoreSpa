import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { SharedModule } from '@app/shared/shared.module';
import { AppCalendarComponent } from './calendar/calendar.component';
import { AppCalendarHeaderComponent } from './calendar-header/calendar-header.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: AppCalendarComponent }
    ]),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlatpickrModule.forRoot(),
    SharedModule
  ],
  declarations: [AppCalendarComponent, AppCalendarHeaderComponent]
})
export class AppCalendarModule { }
