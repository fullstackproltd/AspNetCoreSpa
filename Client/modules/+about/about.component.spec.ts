import {
  inject,
  async,
  TestComponentBuilder,
  addProviders
} from '@angular/core/testing';

import { Component, provide } from '@angular/core';

// Load the implementations that should be tested
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    addProviders([AboutComponent]);
  });

  it('should log ngOnInit', inject([AboutComponent], (aboutComponent) => {
    spyOn(console, 'log1');
    expect(console.log).not.toHaveBeenCalled();

    aboutComponent.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
