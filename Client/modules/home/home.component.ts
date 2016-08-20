import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appc-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    console.log('home component loaded');
  }

}
