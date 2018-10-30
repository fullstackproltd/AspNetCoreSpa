import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPlaygroundComponent } from './forms-playground.component';

describe('FormsPlaygroundComponent', () => {
  let component: FormsPlaygroundComponent;
  let fixture: ComponentFixture<FormsPlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsPlaygroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
