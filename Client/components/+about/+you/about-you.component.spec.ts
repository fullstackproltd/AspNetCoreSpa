import {
  inject,
  async,
  TestComponentBuilder,
  addProviders
} from '@angular/core/testing';

import { Component, provide } from '@angular/core';

// Load the implementations that should be tested
import { AboutYouComponent } from './about-you.component';

describe('AboutYouComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    addProviders([AboutYouComponent]);
  });

  it('should log ngOnInit', inject([AboutYouComponent], (aboutYouComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    aboutYouComponent.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
