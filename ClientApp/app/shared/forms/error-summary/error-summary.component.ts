import { Component } from '@angular/core';
import { NotificationsService, NotificationEvent, Notification } from '../../../core';

@Component({
    selector: 'appc-error-summary',
    templateUrl: './error-summary.component.html'
})
export class ErrorSummaryComponent {
    notification: Notification;
    constructor(private ns: NotificationsService) {
        this.ns.getChangeEmitter()
            .subscribe((x: NotificationEvent) => {
                console.log(x);
                if (x.add) {
                    this.notification = x.notification;
                } else {
                    this.notification = null;
                }
            });
    }
}
