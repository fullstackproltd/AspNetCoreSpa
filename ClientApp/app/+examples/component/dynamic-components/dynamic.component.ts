import { Component, OnInit, Input } from '@angular/core';
import { RedDynamicComponent } from './red-dynamic.component';
import { BlueDynamicComponent } from './blue-dynamic.component';
import { GreenDynamicComponent } from './green-dynamic.component';

@Component({
    selector: 'appc-dynamic',
    templateUrl: './dynamic.component.html'
})
export class DynamicComponent implements OnInit {
    @Input()
    public componentTypes: any[] = [
        BlueDynamicComponent,
        GreenDynamicComponent,
        RedDynamicComponent
    ];

    @Input()
    public selectedComponentType: any;

    public ngOnInit(): void {
        // default to the first available option
        this.selectedComponentType = this.componentTypes ? this.componentTypes[0] : null;
    }

}
