import { Component, Input } from '@angular/core';

@Component({
    selector: 'page-heading',
    template: `<h2>{{text}}</h2>`
})
export class PageHeading {
    @Input() text: string;
    constructor() { }
}
