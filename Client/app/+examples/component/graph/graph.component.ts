import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { EdgeService } from './edge.service';
import { EdgeComponent } from './edge.component';

@Component({
    selector: 'appc-graph',
    templateUrl: './graph.component.html',
    styles: [
        `
        .graph-table{
            border-spacing: 70px;
            border-collapse: separate;
            }
        `
    ]
})
export class GraphComponent implements OnInit {

    constructor(private componentResolver: ComponentFactoryResolver, private edgeService: EdgeService) { }

    public ngOnInit() {
        this.edgeService.getCoordinates().subscribe(coordinates => {
            const factory = this.componentResolver.resolveComponentFactory(EdgeComponent);
            const res = coordinates.first.viewContainer.createComponent(factory);
            res.instance.setCoordinates(coordinates.first, coordinates.second);
        });
    }
}
