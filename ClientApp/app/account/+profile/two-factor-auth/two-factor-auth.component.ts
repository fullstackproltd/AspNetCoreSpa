import { Component, OnInit } from '@angular/core';

import { DataService } from '@app/core';


@Component({
  selector: 'appc-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.scss']
})
export class TwoFactorAuthComponent implements OnInit {

  public model: ITwoFactorModel;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.get2fModel();
  }

  private get2fModel() {
    this.dataService.get<ITwoFactorModel>('api/manage/twofactorauthentication')
      .subscribe(model => this.model = model);
  }
}
