import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/core';

@Component({
  selector: 'appc-reset-authenticator',
  templateUrl: './reset-authenticator.component.html',
  styleUrls: ['./reset-authenticator.component.scss']
})
export class ResetAuthenticatorComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  public resetAuthenticator() {
    this.dataService.post('api/manage/resetauthenticator')
      .subscribe(x => console.log(x));
  }


}
