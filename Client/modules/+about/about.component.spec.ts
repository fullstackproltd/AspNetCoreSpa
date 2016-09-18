import { inject, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent
      ]
    });
  });

  it('should log ngOnInit', inject([AboutComponent], (about: AboutComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    about.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
