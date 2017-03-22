import { Directive, ElementRef, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[three]'
})
export class StructuralAdvancedDirective {

  // three="let message from message" is expanded to threeFrom
  @Input() set threeFrom({ one, two, three }: any) {
    // If we don't clear it will append the incoming values each time they change
    this.view.clear();

    this.view.createEmbeddedView(this.template, {
      $implicit: one
    });

    this.view.createEmbeddedView(this.template, {
      $implicit: two
    });

    this.view.createEmbeddedView(this.template, {
      $implicit: three
    });
  }

  constructor(
    el: ElementRef,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
    console.log(el.nativeElement);
  }

}
