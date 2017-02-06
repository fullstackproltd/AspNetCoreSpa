import { Routes, RouterModule } from '@angular/router';

import { ComponentHomeComponent } from './component-home.component';
import { GraphComponent } from './graph/graph.component';
import { ParentComponent } from './access-child-components/parent';

const routes: Routes = [
    { path: '', redirectTo: 'components', pathMatch: 'full' },
    {
        path: 'components', component: ComponentHomeComponent, children: [
            { path: 'graph', component: GraphComponent },
            { path: 'accesschildcomponent', component: ParentComponent }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
