import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../core/services/account.service';
import { ControlBase } from '../../shared/forms/control-base';
import { ControlTextbox } from '../../shared/forms/control-textbox';

@Component({
  selector: 'appc-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public controls: any;

  constructor(private accountService: AccountService) { }

  public ngOnInit() {
    const controls: Array<ControlBase<any>> = [
      new ControlTextbox({
        key: 'email',
        label: 'Email',
        placeholder: 'Email',
        value: '',
        type: 'email',
        required: true,
        order: 1
      })
    ];

    this.controls = controls;
  }
  public create(event: any) {
    this.accountService.create(event.email)
      .subscribe((x: any) => {
        console.log(x);
      })
  }

}
