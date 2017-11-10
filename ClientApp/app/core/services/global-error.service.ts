import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import { NotificationsService } from '../simple-notifications';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private ns: NotificationsService) { }

  handleError(errorResponse: HttpErrorResponse): void {
    console.log('***** HANDLE ERROR *****');
    if (errorResponse.status === 400) {
      this.ns.error(errorResponse.error.message, errorResponse.error.errors.map((x: any) => x.message).join('/n'));
    }
    // IMPORTANT: Don't Rethrow the error otherwise it will not emit errors after once
    // https://stackoverflow.com/questions/44356040/angular-global-error-handler-working-only-once
    // throw errorResponse;
  }

}
