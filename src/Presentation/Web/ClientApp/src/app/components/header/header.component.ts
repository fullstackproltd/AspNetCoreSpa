import { Component, OnInit } from '@angular/core';
import { User } from 'oidc-client';

import { AppService, AuthorizeService } from '@app/shared';

import { routes } from '../../+examples/examples.routes';

@Component({
  selector: 'appc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;

  exampleRoutes = [...routes];

  constructor(private authService: AuthorizeService, private appService: AppService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
  get user(): User {
    return this.authService.user;
  }
  get cultures(): ICulture[] {
    return this.appService.appData.cultures;
  }
  get currentCulture(): ICulture {
    return this.cultures.filter(x => x.current)[0];
  }
  ngOnInit(): void {}

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
