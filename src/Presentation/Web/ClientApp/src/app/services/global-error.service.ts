import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { ToastrService } from '@app/toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(errorResponse: any): void {
    if (errorResponse.status === 401) {
      this.injector.get(ToastrService).error('Please login again.', 'Unauthorised', { onActivateTick: true });
    } else if (errorResponse.status === 400) {
      this.injector.get(ToastrService).error(this.formatErrors(errorResponse.error.errors), errorResponse.error.message, { onActivateTick: true, enableHtml: true });
    } else {
      // All other errors including 500
      const error = (errorResponse && errorResponse.rejection) ? errorResponse.rejection.error : errorResponse;
      this.injector.get(ToastrService).error(error, 'Unknown error', { onActivateTick: true });
      // IMPORTANT: Don't Rethrow the error otherwise it will not emit errors after once
      // https://stackoverflow.com/questions/44356040/angular-global-error-handler-working-only-once
      // throw errorResponse;
    }
    console.error(errorResponse);
  }

  private formatErrors(errors: any) {
    return errors ? errors.map((err: any) => err.message).join('<br>') : '';
  }

}
