import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AboutYouComponent } from './about-you.component';

describe('AboutYouComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutYouComponent
      ]
    });
  });

  it('should log ngOnInit', inject([AboutYouComponent], (aboutYouComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    aboutYouComponent.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
