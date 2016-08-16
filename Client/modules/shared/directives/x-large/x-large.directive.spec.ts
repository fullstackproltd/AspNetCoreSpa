import {
  inject,
  async,
  TestComponentBuilder
} from '@angular/core/testing';

import { Component, provide } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { XLargeDirective } from './x-large.directive';

describe('x-large directive', () => {
  // Create a test component to test directives
  @Component({
    template: '',
    directives: [ XLargeDirective ]
  })
  class TestComponent {}

  it('should set font-size to x-large', async(inject([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<div appdXlarge>Content</div>')
      .createAsync(TestComponent).then((fixture: any) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement.children[0];
        expect(compiled.style.fontSize).toBe('x-large');
      });
  })));

});
