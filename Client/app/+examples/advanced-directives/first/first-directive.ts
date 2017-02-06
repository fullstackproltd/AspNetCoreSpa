import { Directive, OnInit, HostBinding, HostListener, Input, Component } from '@angular/core';

@Component({
  selector: 'basic',
  template: `<div></div>`
})
export class BasicComponent {

}

// tslint:disable-next-line:max-classes-per-file
@Directive({
  selector: '[first]'
})
export class FirstAdvancedDirective {

  @Input() public first: string;

  @HostBinding() get innerText() {
    return this.first;
  }

  @HostListener('click', ['$event']) public onClick($event) {
    this.first = 'clicked';
  }

}
