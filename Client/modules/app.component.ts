/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataService } from './shared/services';

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'appc-app',
  pipes: [],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) { }


  ngOnInit() {
    this.dataService.get('api/content?lang=en')
      .subscribe(x => console.log(x));
  }
}
