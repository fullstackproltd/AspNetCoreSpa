import { Routes, RouterModule } from '@angular/router';

import { UibootstrapComponent } from './uibootstrap.component';
import { DatetimeComponent } from './datetime/datetime.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';

const routes: Routes = [
  {
    path: '', component: UibootstrapComponent, children: [
      { path: 'datetime', component: DatetimeComponent },
      { path: 'typeahead', component: TypeaheadComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
