import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { NotificationsService } from '../../../../core/simple-notifications/simple-notifications.module';

@Component({
  selector: 'appc-reset-authenticator',
  templateUrl: './reset-authenticator.component.html',
  styleUrls: ['./reset-authenticator.component.scss']
})
export class ResetAuthenticatorComponent implements OnInit {

  @Output() public reset = new EventEmitter();

  constructor(
    private dataService: DataService,
    private ns: NotificationsService
  ) { }

  ngOnInit() { }

  public resetAuthenticator() {
    this.dataService.post('api/manage/resetauthenticator')
      .subscribe(() => {
        this.ns.success('Authenticator key reset');
        this.reset.emit(null);
      });
  }


}
