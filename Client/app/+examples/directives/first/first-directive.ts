import { Directive, HostBinding, HostListener, Input, Component } from '@angular/core';

@Component({
  selector: 'appc-basic',
  template: `<div></div>`
})
export class BasicComponent {

}

// tslint:disable-next-line:max-classes-per-file
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[first]'
})
export class FirstAdvancedDirective {

  @Input() public first: string;

  @HostBinding() get innerText() {
    return this.first;
  }

  @HostListener('click', ['$event']) public onClick($event: any) {
    this.first = 'clicked';
  }

}
