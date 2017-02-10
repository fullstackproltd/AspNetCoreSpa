import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appc-examples-home',
  templateUrl: './examples-home.component.html'
})
export class ExamplesHomeComponent implements OnInit {
  public examples: any;

  public ngOnInit() {
    this.examples = [
      { route: 'animation', title: 'Animation', description: 'An example using angular 2 webanimations api' },
      { route: 'typeahead', title: 'Typeahead', description: 'An example showing ngbootstrap\'s typeahed control' },
      { route: 'rxjs', title: 'Rxjs', description: 'Various Rxjs examples to cover some concepts' },
      { route: 'advanceddirectives', title: 'Advanced directives', description: 'Advanced directives examples' },
      { route: 'components', title: 'Component examples', description: 'Various component examples' },
      { route: 'jqueryintegration', title: 'jQuery integration', description: 'Implementation of jquery inside Angular 2' },
      { route: 'changedetection', title: 'Change detection', description: 'Default vs onPush to illustrate better performance' },
      { route: 'reactiveforms', title: 'Reactive forms', description: 'Examples of reactive forms using angular reactive forms module' },
      { route: 'datetime', title: 'Datetime example', description: 'Example of datetime picker using ng-bootstrap datetime component' }
    ];
  }

}
