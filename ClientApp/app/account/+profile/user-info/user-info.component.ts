import { Component, OnInit } from '@angular/core';

import { NotificationsService } from '../../../core';
import { ControlBase, ControlTextbox } from '../../../shared';

import { UserInfoModel } from '../profile.models';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'appc-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public errors: string[];
  public controls: Array<ControlBase<string>> = [
    new ControlTextbox({
      key: 'firstName',
      label: 'First name',
      placeholder: 'Firstname',
      value: '',
      type: 'textbox',
      required: true,
      order: 1
    }),
    new ControlTextbox({
      key: 'lastName',
      label: 'Last name',
      placeholder: 'Lastname',
      value: '',
      type: 'textbox',
      required: true,
      order: 2
    })
  ];

  constructor(public profileService: ProfileService, private ns: NotificationsService) { }

  public ngOnInit() { }

  public save(model: UserInfoModel): void {
    this.profileService.userInfo(model)
      .subscribe((res: UserInfoModel) => {
        this.ns.success(`Name changed to ${res.firstName} ${res.lastName}`);
      });

  }

}
