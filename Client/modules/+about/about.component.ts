import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterConfig } from '@angular/router';

@Component({
  selector: 'appc-about',
  styleUrls: ['./about.component.scss'],
  template: `
  <appc-page-heading text='About page'></appc-page-heading>
  <p>With nested Angular 2 routing</p>
    <div class="nav">
        <a routerLink="../about">About me</a>
        <a routerLink="you">About you</a>
    </div>    
    <router-outlet></router-outlet>
  `
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    console.log('testing the spec');
  }
}
