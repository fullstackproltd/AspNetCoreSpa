import { Injectable } from '@angular/core';
import { LogPublisher } from './log-publishers';
import { LogPublishersService } from './log-publishers.service';

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

export class LogEntry {
  // Public properties
  entryDate: Date = new Date();
  message = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate = true;

  buildLogString(): string {
    let ret = '';

    if (this.logWithDate) {
      ret = new Date() + ' - ';
    }
    ret += 'Type: ' + LogLevel[this.level];
    ret += ' - Message: ' + this.message;
    if (this.extraInfo.length) {
      ret += ' - Extra Info: ' + this.formatParams(this.extraInfo);
    }

    return ret;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(',');

    if (params.some(p => typeof p === 'object')) {
      ret = '';
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }

    return ret;
  }
}

@Injectable()
export class LogService {
  // Public properties
  level: LogLevel = LogLevel.All;
  logWithDate = true;
  publishers: LogPublisher[];

  constructor(private publishersService: LogPublishersService) {
    // Set all the publishers into the local array
    this.publishers = this.publishersService.publishers;
  }

  private shouldLog(level: LogLevel): boolean {
    let ret = false;

    if (this.level !== LogLevel.Off && level >= this.level) {
      ret = true;
    }

    return ret;
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  log(msg: any, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  clear(): void {
    for (const logger of this.publishers) {
      logger.clear();
    }
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();

      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;

      // Log the value to all publishers
      for (const logger of this.publishers) {
        logger.log(entry).subscribe(response => console.log(response));
      }
    }
  }
}
