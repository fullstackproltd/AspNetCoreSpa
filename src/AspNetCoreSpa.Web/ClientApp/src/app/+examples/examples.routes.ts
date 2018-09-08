import { Routes } from '@angular/router';

import { ExamplesComponent } from './examples/examples.component';

export const routes: Routes = [
    { path: '', component: ExamplesComponent },
    { path: 'calendar', loadChildren: './examples/calendar/calendar.module#AppCalendarModule' },
    { path: 'datatable', loadChildren: './examples/datatable/datatable.module#DatatableModule' }
];
