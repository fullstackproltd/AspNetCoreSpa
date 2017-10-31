import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LogEntry } from './log.service';
import { DataService } from '../data.service';

export abstract class LogPublisher {
  location: string;

  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {
  log(record: LogEntry): Observable<boolean> {
    // Log to the console
    console.log(record.buildLogString());

    return Observable.of(true);
  }

  clear(): Observable<boolean> {
    console.clear();

    return Observable.of(true);
  }
}

export class LogLocalStorage extends LogPublisher {
  constructor() {
    super();

    this.location = 'logging';
  }

  getAll(): Observable<LogEntry[]> {
    let values: LogEntry[];

    // Retrieve all values from local storage
    const location = localStorage.getItem(this.location);
    values = location ? JSON.parse(location) : [];

    return Observable.of(values);
  }

  log(record: LogEntry): Observable<boolean> {
    const ret = false;
    let values: LogEntry[];

    try {
      const sessionValues = localStorage.getItem(this.location);
      values = sessionValues ? JSON.parse(sessionValues) : [];
      // Add new log entry to the array
      values.push(record);
      // Store the complete array into local storage
      localStorage.setItem(this.location, JSON.stringify(values));
    } catch (ex) {
      console.log(ex);
    }

    return Observable.of(ret);
  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return Observable.of(true);
  }
}

export class LogPublisherConfig {
  loggerName: string;
  loggerLocation: string;
  isActive: boolean;
}

export class LogWebApi extends LogPublisher {
  constructor(private dataService: DataService) {
    super();

    this.location = 'http://localhost:56590/api/log';
  }

  log(record: LogEntry): Observable<boolean> {

    return this.dataService.post(this.location, record)
      .catch(this.handleErrors);
  }

  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all log entries
    return Observable.of(true);
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
