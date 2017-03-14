import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseComment } from './base-comment';

@Component({
    selector: 'appc-comment-section-2',
    templateUrl: './comment-selection.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ChangeDetectionDefaultComponent extends BaseComment {
    constructor() {
        super();
        this.message = 'Using ChangeDetectionStrategy.Default';
    }
}
