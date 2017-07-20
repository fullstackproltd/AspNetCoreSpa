import { Component, Input, ViewContainerRef, OnInit, ComponentFactoryResolver } from '@angular/core';

@Component({
    selector: 'appc-grid-cell',
    template: ''
})
export class CellComponent implements OnInit {
    @Input()
    public componentType: any;

    constructor(private viewContainerRef: ViewContainerRef, private cfr: ComponentFactoryResolver) {
    }

    public ngOnInit() {
        const compFactory = this.cfr.resolveComponentFactory(this.componentType);
        this.viewContainerRef.createComponent(compFactory);
    }
}
