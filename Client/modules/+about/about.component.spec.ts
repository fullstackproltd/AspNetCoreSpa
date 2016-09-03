import {
  inject,
  async,
  TestBed
} from '@angular/core/testing';

import { Component } from '@angular/core';

// Load the implementations that should be tested
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule([AboutComponent]);
  });

  it('should log ngOnInit', inject([AboutComponent], (aboutComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    aboutComponent.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
