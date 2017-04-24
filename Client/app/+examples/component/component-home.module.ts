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
import { GridModule } from './dynamic-components/library/grid.module';
import { BlueDynamicComponent } from './dynamic-components/blue-dynamic.component';
import { GreenDynamicComponent } from './dynamic-components/green-dynamic.component';
import { RedDynamicComponent } from './dynamic-components/red-dynamic.component';
import { DynamicComponent } from './dynamic-components/dynamic.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
    imports: [
        routing,
        SharedModule,
        GridModule.withComponents([
            BlueDynamicComponent,
            GreenDynamicComponent,
            RedDynamicComponent])
    ],
    exports: [],
    declarations: [
        GraphComponent,
        EdgeComponent,
        VertexComponent,
        ComponentHomeComponent,
        ParentComponent,
        ChildComponent,
        DynamicComponent,
        BlueDynamicComponent,
        GreenDynamicComponent,
        RedDynamicComponent,
        RxjsComponent

    ],
    // dynamic components have to be added in entry components
    entryComponents: [EdgeComponent],
    providers: [EdgeService],
})
export class ComponentModule { }
