import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'appc-other-accounts',
  templateUrl: './other-accounts.component.html',
  styleUrls: ['./other-accounts.component.scss']
})
export class OtherAccountsComponent implements OnInit {

  public logins: ISocialLogins[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getLogins();
  }

  private getLogins() {
    this.dataService.get<ISocialLogins[]>('api/manage/getlogins')
      .subscribe(logins => this.logins = logins);
  }
}
