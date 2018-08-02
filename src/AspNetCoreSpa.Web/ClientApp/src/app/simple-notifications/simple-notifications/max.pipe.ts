import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'max' })
export class MaxPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (!value) {
      return value;
    }

    const allowed = args[0];
    const received = value.length;

    if (received > allowed && allowed !== 0) {
      const toCut = allowed - received;
      return value.slice(0, toCut);
    }

    return value;
  }
}
