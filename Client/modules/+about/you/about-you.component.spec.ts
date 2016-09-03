import {
  inject,
  async,
  TestBed
} from '@angular/core/testing';

import { Component } from '@angular/core';

// Load the implementations that should be tested
import { AboutYouComponent } from './about-you.component';

describe('AboutYouComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule([AboutYouComponent]);
  });

  it('should log ngOnInit', inject([AboutYouComponent], (aboutYouComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    aboutYouComponent.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
