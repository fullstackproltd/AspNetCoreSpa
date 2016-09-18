import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appc-examples-home',
  templateUrl: './examples-home.component.html',
  styleUrls: ['./examples-home.component.scss']
})
export class ExamplesHomeComponent implements OnInit {
  examples: any;
  constructor() { }

  ngOnInit() {
    this.examples = [
      { route: 'animation', title: 'Animation', description: 'An example using angular 2 webanimations api' },
      { route: 'typeahead', title: 'Typeahead', description: 'An example showing ngbootstrap\'s typeahed control' }
    ];
  }

}
