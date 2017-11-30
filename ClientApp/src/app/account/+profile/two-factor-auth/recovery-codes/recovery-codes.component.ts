import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from '../../../../notifications/simple-notifications.module';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'appc-recovery-codes',
  templateUrl: './recovery-codes.component.html',
  styleUrls: ['./recovery-codes.component.scss']
})
export class RecoveryCodesComponent implements OnInit {
  @Input() model: ITwoFactorModel;

  constructor(private dataService: DataService, private ns: NotificationsService) { }

  ngOnInit() { }

  disableTwoFactorWarning() {
    this.dataService.post('api/manage/disable2fa')
      .subscribe(() => {
        this.ns.success('Two factor authentication disabled');
      });
  }

  generateRecoveryCodes() {
    this.dataService.post<string[]>('api/manage/generaterecoverycodes')
      .subscribe((codes: string[]) => {
        this.ns.success('Recovery codes are', codes.join('|'));
      });
  }

}
