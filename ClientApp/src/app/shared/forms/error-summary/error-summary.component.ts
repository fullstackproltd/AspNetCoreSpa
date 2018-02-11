import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService, NotificationEvent, Notification } from '../../../core/simple-notifications/simple-notifications.module';

@Component({
    selector: 'appc-error-summary',
    styleUrls: ['./error-summary.component.scss'],
    templateUrl: './error-summary.component.html'
})
export class ErrorSummaryComponent implements OnInit, OnDestroy {
    notification: Notification;
    sub: any;
    constructor(private ns: NotificationsService) {
    }

    mapNotificationType(type: string) {
        if (type === 'error') {
            return 'danger';
        }
        return type;
    }
    ngOnInit() {
        this.sub = this.ns.getChangeEmitter()
            .subscribe((x: NotificationEvent) => {
                if (x.add) {
                    this.notification = x.notification;
                } else {
                    this.notification = null;
                }
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
