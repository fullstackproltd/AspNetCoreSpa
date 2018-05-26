import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveShapeComponent } from './move-shape.component';

describe('MoveShapeComponent', () => {
  let component: MoveShapeComponent;
  let fixture: ComponentFixture<MoveShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveShapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
