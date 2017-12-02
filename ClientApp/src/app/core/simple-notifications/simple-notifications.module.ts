import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsComponent } from './simple-notifications/simple-notifications.component';
import { NotificationComponent } from './simple-notifications/notification.component';
import { MaxPipe } from './simple-notifications/max.pipe';
import { NotificationsService } from './simple-notifications/notifications.service';

// Type
export * from './simple-notifications/interfaces/notification.type';
export * from './simple-notifications/interfaces/notification-event.type';
export * from './simple-notifications/interfaces/options.type';
export * from './simple-notifications/interfaces/icons';

export * from './simple-notifications/simple-notifications.component';
export * from './simple-notifications/notification.component';
export * from './simple-notifications/max.pipe';
export * from './simple-notifications/notifications.service';

@NgModule({
  providers: [NotificationsService],
  imports: [
    CommonModule
  ],
  declarations: [
    SimpleNotificationsComponent,
    NotificationComponent,
    MaxPipe
  ],
  exports: [SimpleNotificationsComponent]
})
export class SimpleNotificationsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SimpleNotificationsModule,
    };
  }
}
