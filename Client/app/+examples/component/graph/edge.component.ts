import { Component, Input } from '@angular/core';
import { Coordinates } from './coordinates';

@Component({
    selector: 'appc-edge',
    template: '<div class="edge" [ngStyle]="style"></div>',
    styleUrls: ['./edge.component.scss']
})
export class EdgeComponent {
    public style = {};
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;

    public setCoordinates(first, second) {
        this.x1 = first.x;
        this.y1 = first.y;
        this.x2 = second.x;
        this.y2 = second.y;

        this.drawLine(this.x1, this.y1, this.x2, this.y2);
    }

    public drawLine(x1, y1, x2, y2) {
        const length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        const transform = 'rotate(' + angle + 'deg)';

        this.style = {
            position: 'absolute',
            transform: transform.toString(),
            width: length + 'px'
        };
    }
}
