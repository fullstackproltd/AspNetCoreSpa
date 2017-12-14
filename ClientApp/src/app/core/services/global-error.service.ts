import { ErrorHandler, Injectable, ApplicationRef, Injector } from '@angular/core';
import { NotificationsService } from '../simple-notifications/simple-notifications.module';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private ns: NotificationsService,
    private inj: Injector
  ) { }

  handleError(errorResponse: any): void {
    if (errorResponse.status === 401) {
      this.ns.error('Unauthorised', 'Pleae login again.');
      this.inj.get(ApplicationRef).tick();
    } else if (errorResponse.status === 400) {
      console.log('***** HANDLE ERROR *****');
      this.ns.error(errorResponse.error.message,
        this.formatErrors(errorResponse.error.errors)
      );
      this.inj.get(ApplicationRef).tick();
    }
    this.ns.error(errorResponse);
    console.error(errorResponse);
    // IMPORTANT: Don't Rethrow the error otherwise it will not emit errors after once
    // https://stackoverflow.com/questions/44356040/angular-global-error-handler-working-only-once
    // throw errorResponse;
  }

  private formatErrors(errors: any) {
    return errors ? errors.map((err: any) => err.message).join('/n') : '';
  }

}
