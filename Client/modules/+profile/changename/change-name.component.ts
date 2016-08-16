import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProfileService } from '../profile.service';
import { ChangeNameModel } from './';
import { PageHeading } from '../../shared/directives';

@Component({
    selector: 'sd-change-name',
    templateUrl: './change-name.component.html'
})
export class ChangeNameComponent implements OnInit {
    userNameModel: ChangeNameModel = new ChangeNameModel('', '');
    @Output() notification = new EventEmitter<string>();

    constructor(private profileService: ProfileService) {
    }

    ngOnInit() {
        this.profileService.userName()
            .subscribe((res: any) => {
                this.userNameModel.firstName = res.firstName;
                this.userNameModel.lastName = res.lastName;
            },
            (errors: any) => this.notification.emit(errors[0])
            );
    }

    save(): void {
        this.profileService.userName(this.userNameModel)
            .subscribe((res: any) => {
                this.userNameModel.firstName = res.firstName;
                this.userNameModel.lastName = res.lastName;
                this.notification.emit(`Profile name changed to ${res.firstName} ${res.lastName}`);
            },
            (errors: any) => this.notification.emit(errors[0])
            );

    }

}
