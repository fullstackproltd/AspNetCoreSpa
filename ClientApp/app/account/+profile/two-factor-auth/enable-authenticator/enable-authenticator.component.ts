import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/core';
declare var QRCode: any;
@Component({
  selector: 'appc-enable-authenticator',
  templateUrl: './enable-authenticator.component.html',
  styleUrls: ['./enable-authenticator.component.scss']
})
export class EnableAuthenticatorComponent implements OnInit {

  public model: IEnableAuthenticatorModel;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.enableauthenticator();
  }

  public enableauthenticator() {
    this.dataService.get<IEnableAuthenticatorModel>('api/manage/enableauthenticator')
      .subscribe(res => {
        this.model = res;
        this.setupQr();
      });
  }

  public verify(form: any) {
    if (form.valid) {
      this.dataService.post('api/manage/enableauthenticator', form.value)
        .subscribe(x => {
          console.log(x);
        });

    }
  }
  private setupQr() {
    const qr = new QRCode(document.getElementById('qrCode'),
      {
        text: this.model.authenticatorUri,
        width: 150,
        height: 150
      });

    console.log(qr);
  }

}
