import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'appc-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.scss']
})
export class TwoFactorAuthComponent implements OnInit {

  public enableAuthenticator: boolean;
  public model: ITwoFactorModel;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.get2fModel();
  }

  private get2fModel() {
    this.dataService.post<ITwoFactorModel>('api/manage/twofactorauthentication')
      .subscribe((res: ITwoFactorModel) => this.model = res);
  }
}
