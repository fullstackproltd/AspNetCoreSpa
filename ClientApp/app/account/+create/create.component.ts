import { Component, OnInit } from '@angular/core';

import { ControlBase, ControlTextbox } from '../../shared';
import { AccountService } from '../../core';


@Component({
  selector: 'appc-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public controls: any;
  public errors: any;

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
      }, (res) => {
        this.errors = JSON.parse(res.error);
      });
  }

}
