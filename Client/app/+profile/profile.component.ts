import { Component } from '@angular/core';

import { ProfileService } from './profile.service';

@Component({
    selector: 'appc-user-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
    public notificationMessage: string;
    public notify(message: string) {
        this.notificationMessage = message;
    }
}
