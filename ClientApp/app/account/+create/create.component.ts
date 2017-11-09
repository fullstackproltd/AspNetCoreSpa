import { Component, OnInit } from '@angular/core';

import { ControlBase, ControlTextbox } from '../../shared';

@Component({
  selector: 'appc-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public controls: any;
  public errors: any;

  constructor() { }

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
    const url = window.location.protocol + '//' + window.location.host + '/api/account/ExternalLoginCreateAccount?email=' + event.email;
    window.location.href = url;
  }

}
