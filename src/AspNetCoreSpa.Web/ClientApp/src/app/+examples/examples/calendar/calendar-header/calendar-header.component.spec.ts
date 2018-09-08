import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCalendarHeaderComponent } from './calendar-header.component';

describe('AppCalendarHeaderComponent', () => {
  let component: AppCalendarHeaderComponent;
  let fixture: ComponentFixture<AppCalendarHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCalendarHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
