import { Routes, RouterModule } from '@angular/router';

import { ComponentHomeComponent } from './component-home.component';
import { GraphComponent } from './graph/graph.component';
import { ParentComponent } from './access-child-components/parent';
import { DynamicComponent } from './dynamic-components/dynamic.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
    {
        path: '', component: ComponentHomeComponent, children: [
            { path: 'graph', component: GraphComponent },
            { path: 'accesschildcomponent', component: ParentComponent },
            { path: 'dynamiccomponent', component: DynamicComponent },
            { path: 'rxjs', component: RxjsComponent }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
