import { Component } from '@angular/core';

import { ProfileService } from './profile.service';

@Component({
    selector: 'appc-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
    constructor(public profileService: ProfileService) { }
}
