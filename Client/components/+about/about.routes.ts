import { Routes, RouterModule }  from '@angular/router';

import { AboutComponent }  from './about.component';
import { AboutMeComponent }  from './+me';
import { AboutYouComponent }  from './+you';

const routes: Routes = [
  { path: '', component: AboutComponent ,
    children: [
            { path: '',    component: AboutMeComponent },
            { path: 'you', component: AboutYouComponent }
        ]
  }
];

export const routing = RouterModule.forChild(routes);
