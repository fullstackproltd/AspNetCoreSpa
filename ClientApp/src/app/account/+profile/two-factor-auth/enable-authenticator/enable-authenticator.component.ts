import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';

declare var QRCode: any;
@Component({
  selector: 'appc-enable-authenticator',
  templateUrl: './enable-authenticator.component.html',
  styleUrls: ['./enable-authenticator.component.scss']
})
export class EnableAuthenticatorComponent implements OnInit {

  public verifyCode: string;
  @ViewChild('qrcode') private qrCode: ElementRef;
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
      this.dataService.post('api/manage/enableauthenticator', form.value).subscribe();
    }
  }

  public onReset() {
    this.enableauthenticator();
  }

  private setupQr() {
    this.qrCode.nativeElement.innerHTML = '';
    const qr = new QRCode(this.qrCode.nativeElement,
      {
        text: this.model.authenticatorUri,
        width: 150,
        height: 150
      });

    console.log(qr);
  }

}
