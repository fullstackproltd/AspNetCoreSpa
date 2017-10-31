import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureImageComponent } from './secure-image.component';

describe('SecureImageComponent', () => {
  let component: SecureImageComponent;
  let fixture: ComponentFixture<SecureImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
