import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseComment } from './base-comment';

@Component({
    selector: 'appc-comment-section-1',
    templateUrl: './comment-selection.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionOnPushComponent extends BaseComment {
    constructor() {
        super();
        this.message = 'Using ChangeDetectionStrategy.OnPush';
    }
}
