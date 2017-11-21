import { Injectable, Injector } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage, LogWebApi, LogPublisherConfig } from './log-publishers';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';

const PUBLISHERS_FILE = 'assets/log-publishers.json';

@Injectable()
export class LogPublishersService {
  publishers: LogPublisher[] = [];

  constructor(private inj: Injector) {
    this.buildPublishers();
  }

  buildPublishers(): void {
    let logPub: LogPublisher;

    const dataService = this.inj.get(DataService);
    this.getLoggers().subscribe(response => {
      for (const pub of response.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case 'console':
            logPub = new LogConsole();
            break;
          case 'localstorage':
            logPub = new LogLocalStorage();
            break;
          case 'webapi':
            logPub = new LogWebApi(dataService);
            break;
        }

        // Set location, if any, of the logging
        logPub.location = pub.loggerLocation;
        // Add publisher to array
        this.publishers.push(logPub);
      }
    });
  }

  getLoggers(): Observable<LogPublisherConfig[]> {
    const dataService = this.inj.get(DataService);
    return dataService.get(PUBLISHERS_FILE)
      .catch(this.handleErrors);
  }

  private handleErrors(error: any): Observable<any> {
    const errors: string[] = [];
    let msg = '';

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;
    if (error.json()) {
      msg += ' - Exception Message: ' + error.json().exceptionMessage;
    }

    errors.push(msg);

    console.error('An error occurred', errors);

    return Observable.throw(errors);
  }
}
