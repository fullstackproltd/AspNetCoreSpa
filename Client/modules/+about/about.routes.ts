import { Routes, RouterModule }  from '@angular/router';

import { AboutComponent }  from './about.component';
import { AboutMeComponent } from './me/about-me.component';
import { AboutYouComponent } from './you/about-you.component';

const routes: Routes = [
  { path: '', component: AboutComponent ,
    children: [
            { path: '',    component: AboutMeComponent },
            { path: 'you', component: AboutYouComponent }
        ]
  }
];

export const routing = RouterModule.forChild(routes);
