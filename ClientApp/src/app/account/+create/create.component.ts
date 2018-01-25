import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ControlBase } from '../../shared/forms/controls/control-base';
import { ControlTextbox } from '../../shared/forms/controls/control-textbox';

@Component({
  selector: 'appc-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public controls: any;
  constructor(private oAuthService: OAuthService) { }

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
    this.oAuthService.initImplicitFlow(null, { email: event.email });
  }

}
