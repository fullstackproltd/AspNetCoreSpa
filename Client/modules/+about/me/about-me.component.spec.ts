import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutMeComponent
      ]
    });
  });

  it('should log ngOnInit', inject([AboutMeComponent], (aboutMeComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    aboutMeComponent.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
