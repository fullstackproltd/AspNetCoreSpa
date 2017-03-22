import { Component } from '@angular/core';

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
