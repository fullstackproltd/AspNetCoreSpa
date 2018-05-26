import { Component } from '@angular/core';

import { ProfileService } from './profile.service';

@Component({
    selector: 'appc-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
    menus = [
        { route: 'userinfo', text: 'User info' },
        { route: 'updatepassword', text: 'Update password' },
        { route: 'userphoto', text: 'User photo' },
        { route: 'otheraccounts', text: 'Other accounts' }
    ];

    constructor(public profileService: ProfileService) { }
}
