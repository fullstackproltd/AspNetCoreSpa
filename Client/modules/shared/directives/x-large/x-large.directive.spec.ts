import {
  inject,
  async,
  TestBed
} from '@angular/core/testing';

import { Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { XLargeDirective } from './x-large.directive';

describe('x-large directive', () => {
  // Create a test component to test directives
  @Component({
    template: ''
  })
  class TestComponent {}

  it('should set font-size to x-large', async(inject([TestBed], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<div appdXlarge>Content</div>')
      .createAsync(TestComponent).then((fixture: any) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement.children[0];
        expect(compiled.style.fontSize).toBe('x-large');
      });
  })));

});
