import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
})
export class TypeaheadComponent implements OnInit {
  @Input() label: string;
  @Input() model: string;

  constructor() {}

  ngOnInit(): void {}

  search(terms) {}
}
