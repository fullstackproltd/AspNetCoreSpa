import { Routes, RouterModule } from '@angular/router';

import { JqueryComponent } from './jquery.component';
import { JQueryDragComponent } from './drag/drag.component';

const routes: Routes = [
    {
        path: '', component: JqueryComponent, children: [
            { path: 'drag', component: JQueryDragComponent }
        ]
    },
];

export const routing = RouterModule.forChild(routes);
