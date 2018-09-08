import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: AppCalendarComponent;
  let fixture: ComponentFixture<AppCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
