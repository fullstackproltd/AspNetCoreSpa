import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProfileService } from '../profile.service';
import { ChangeNameModel } from './change-name.model';

@Component({
    selector: 'appc-change-name',
    templateUrl: './change-name.component.html'
})
export class ChangeNameComponent implements OnInit {
    public userNameModel: ChangeNameModel = new ChangeNameModel('', '');
    public errors: string[];
    @Output() public notification = new EventEmitter<string>();

    constructor(public profileService: ProfileService) { }

    public ngOnInit() {
        this.profileService.userName()
            .subscribe((res: any) => {
                this.userNameModel.firstName = res.firstName;
                this.userNameModel.lastName = res.lastName;
            });
    }

    public save(): void {
        this.profileService.userName(this.userNameModel)
            .subscribe((res: any) => {
                this.userNameModel.firstName = res.firstName;
                this.userNameModel.lastName = res.lastName;
                this.notification.emit(`Profile name changed to ${res.firstName} ${res.lastName}`);
            });

    }

}
