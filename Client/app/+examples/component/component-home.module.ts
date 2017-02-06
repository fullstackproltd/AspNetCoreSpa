import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { ComponentHomeComponent } from './component-home.component';
import { GraphComponent } from './graph/graph.component';
import { EdgeComponent } from './graph/edge.component';
import { VertexComponent } from './graph/vertex.component';
import { ParentComponent } from './access-child-components/parent';
import { ChildComponent } from './access-child-components/child';
import { EdgeService } from './graph/edge.service';
import { routing } from './component-home.routes';

@NgModule({
    imports: [SharedModule, routing],
    exports: [],
    declarations: [
        GraphComponent,
        EdgeComponent,
        VertexComponent,
        ComponentHomeComponent,
        ParentComponent,
        ChildComponent
    ],
    // dynamic components have to be added in entry components
    entryComponents: [EdgeComponent],
    providers: [EdgeService],
})
export class ComponentModule { }
