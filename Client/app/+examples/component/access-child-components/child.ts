import { Component } from '@angular/core';

@Component({
    selector: 'appc-child',
    template: '<div>{{time}}</div>'
})

export class ChildComponent {
    public time: string;

    public setTime(time: string) {
        this.time = time;
    }
}
