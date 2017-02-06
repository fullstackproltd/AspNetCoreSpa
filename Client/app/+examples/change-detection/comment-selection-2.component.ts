// tslint:disable
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseComment } from './base-comment';

@Component({
    templateUrl: './comment-selection.component.html',
    selector: 'comment-section-2',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ChangeDetectionDefaultComponent extends BaseComment {
    constructor() {
        super();
        this.message = 'Using ChangeDetectionStrategy.Default';
    }
}
