// tslint:disable
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseComment } from './base-comment';

@Component({
    templateUrl: './comment-selection.component.html',
    selector: 'comment-section-1',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionOnPushComponent extends BaseComment {
    constructor() {
        super();
        this.message = 'Using ChangeDetectionStrategy.OnPush';
    }
}
