import {
  inject,
  async,
  TestBed,
  addProviders
} from '@angular/core/testing';

import { Component } from '@angular/core';

// Load the implementations that should be tested
import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    addProviders([AboutMeComponent]);
  });

  it('should log ngOnInit', inject([AboutMeComponent], (aboutMeComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    aboutMeComponent.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
