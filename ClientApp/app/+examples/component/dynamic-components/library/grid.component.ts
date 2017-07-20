import { Component, Input } from '@angular/core';

@Component({
    selector: 'appc-grid-component',
    template: `
        <div class="row" *ngFor="let cellComponentType of cellComponentTypes">
            <div class="col-lg-12">
                <appc-grid-cell [componentType]="cellComponentType"></appc-grid-cell>
            </div>
        </div>
    `
})
export class GridComponent {
    @Input()
    public componentTypes: any;

    public cellComponentTypes: any[] = [];

    public addDynamicCellComponent(selectedComponentType: any) {
        this.cellComponentTypes.push(selectedComponentType);
    }
}
