import {
  it,
  inject,
  async,
  describe,
  beforeEachProviders
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';

import { Component, provide } from '@angular/core';

// Load the implementations that should be tested
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AboutComponent
  ]);

  it('should log ngOnInit', inject([AboutComponent], (aboutComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    aboutComponent.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
