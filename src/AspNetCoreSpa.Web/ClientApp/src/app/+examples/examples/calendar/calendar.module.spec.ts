import { AppCalendarModule } from './calendar.module';

describe('AppCalendarModule', () => {
  let calendarModule: AppCalendarModule;

  beforeEach(() => {
    calendarModule = new AppCalendarModule();
  });

  it('should create an instance', () => {
    expect(calendarModule).toBeTruthy();
  });
});
