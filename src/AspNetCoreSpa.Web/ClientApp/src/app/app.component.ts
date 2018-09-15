import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService, ModalService } from './core';
// import { routerTransition } from './router.animations';
import { AppService } from './app.service';
@Component({
  selector: 'appc-root',
  // animations: [routerTransition],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public notificationOptions = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };
  constructor(
    private accountService: AuthService,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private appService: AppService,
    private modalService: ModalService
  ) { }

  public ngOnInit() {
    this.updateTitleAndMeta();
    if (window.location.href.indexOf('?postLogout=true') > 0) {
      this.accountService.signoutRedirectCallback().then(() => {
        const url: string = this.router.url.substring(
          0,
          this.router.url.indexOf('?')
        );
        this.router.navigateByUrl(url);
      });
    }
    // Check cookie consent
    setTimeout(() => {
      if (this.appService.appData.cookieConsent.showConsent) {
        this.modalService.confirm({
          title: 'Cookie consent',
          message: 'Use this space to summarize your privacy and cookie use policy.'
        }).then(() => {
          document.cookie = this.appService.appData.cookieConsent.cookieString;
        }, () => { });
      }
    }, 0);

  }

  public getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

  private updateTitleAndMeta() {
    this.title.setTitle(this.appService.appData.content['app_title']);
    this.meta.addTags([
      { name: 'description', content: this.appService.appData.content['app_description'] },
      { property: 'og:title', content: this.appService.appData.content['app_title'] },
      { property: 'og:description', content: this.appService.appData.content['app_description'] }
    ]);
  }
}
