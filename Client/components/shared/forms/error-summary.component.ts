import { Component, Input } from '@angular/core';

@Component({
    selector: 'sd-error-summary',
    templateUrl: './error-summary.component.html'
})
export class ErrorSummaryComponent {
    @Input() errors: string | string[];

    constructor() { }
}
