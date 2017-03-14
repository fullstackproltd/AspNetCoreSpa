import { Component, ElementRef, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { EdgeService } from './edge.service';
import { Coordinates } from './coordinates';

@Component({
    selector: 'appc-vertex',
    styleUrls: ['./vertex.component.scss'],
    template: '<div #vertex class="vertex" (click)="setCoordinates()"><span class="vertex-text">{{value}}</span></div>'
})
export class VertexComponent {

    @ViewChild('vertex') public element: ElementRef;
    @Input() public value: string;

    constructor(private edgeService: EdgeService, private vc: ViewContainerRef) { }

    public setCoordinates() {
        const offsetLeft = this.element.nativeElement.offsetLeft;
        const offsetTop = this.element.nativeElement.offsetTop;
        this.edgeService.next(new Coordinates(offsetLeft, offsetTop, this.vc));
    }
}
