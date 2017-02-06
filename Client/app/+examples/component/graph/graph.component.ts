import { Component, ComponentFactoryResolver, ViewChild, OnInit } from '@angular/core';
import { EdgeService } from './edge.service';
import { EdgeComponent } from './edge.component';

@Component({
    selector: 'graph',
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
            let factory = this.componentResolver.resolveComponentFactory(EdgeComponent);
            let res = coordinates.first.viewContainer.createComponent(factory);
            res.instance.setCoordinates(coordinates.first, coordinates.second);
        });
    }
}
