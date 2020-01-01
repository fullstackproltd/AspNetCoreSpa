import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

// import { routerTransition } from './router.animations';
import { AppService, ModalService } from '@app/shared';
@Component({
  selector: 'appc-root',
  // animations: [routerTransition],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    private appService: AppService,
    private modalService: ModalService,
  ) {}

  public ngOnInit() {
    console.log(this.appService.appData);

    this.updateTitleAndMeta();
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    // Check cookie consent
    setTimeout(() => {
      if (this.appService.appData.cookieConsent.showConsent) {
        this.modalService
          .open({
            title: 'Cookie consent',
            message: 'Use this space to summarize your privacy and cookie use policy.',
          })
          .then(
            () => {
              document.cookie = this.appService.appData.cookieConsent.cookieString;
            },
            () => {},
          );
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
      { property: 'og:description', content: this.appService.appData.content['app_description'] },
    ]);
  }
}
