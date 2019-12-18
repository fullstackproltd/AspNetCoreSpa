import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppService, AuthService, ModalService, ModalStateService } from '@app/services';
import { MockAppService } from '../../__mocks__/MockAppService';
import { MockAuthService } from '../../__mocks__/MockAuthService';

describe('AppComponent', () => {
  let fixture;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [
          NoopAnimationsModule,
          RouterTestingModule.withRoutes([])
        ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          ModalService,
          ModalStateService,
          { provide: AppService, useClass: MockAppService },
          { provide: AuthService, useClass: MockAuthService },
          { provide: 'BASE_URL', useValue: 'http://mock.com' },
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should be created without error', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('snapshot created successfully', () => {
    expect(fixture).toMatchSnapshot();
  });

});
