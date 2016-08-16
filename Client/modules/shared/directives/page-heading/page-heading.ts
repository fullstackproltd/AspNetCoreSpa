import { Component, Input } from '@angular/core';

@Component({
    selector: 'appc-page-heading',
    template: `<h2>{{text}}</h2>`
})
export class PageHeadingComponent {
    @Input() text: string;
    constructor() { }
}
