import { Component, ViewChildren, QueryList } from '@angular/core';
import { ChildComponent } from './child';

@Component({
    selector: 'appc-parent',
    template: `<div>
                <button (click)="updateViewChildren()">Update Time via ViewChildren</button>
                <appc-child></appc-child>
                <appc-child></appc-child>
              </div>`
})
export class ParentComponent {

    @ViewChildren(ChildComponent) public viewChildren: QueryList<ChildComponent>;

    public updateViewChildren() {
        this.viewChildren.toArray().forEach((child) => child.setTime(new Date().toTimeString()));
    }

}
