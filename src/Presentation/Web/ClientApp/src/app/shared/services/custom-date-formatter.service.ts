import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

export function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

export function isNumber(value: any): value is number {
    return !isNaN(toInteger(value));
}

export function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
}

@Injectable()
export class CustomDateFormatter extends NgbDateParserFormatter {
    // from input -> internal model
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('/');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: null, month: null, day: toInteger(dateParts[0]) };
            } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: null, month: toInteger(dateParts[1]), day: toInteger(dateParts[0]) };
            } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0]) };
            }
        }
        return null;
    }

    // from internal model -> string
    format(date: NgbDateStruct): string {
        return date ?
            `${isNumber(date.day) ? padNumber(date.day) : ''}/${isNumber(date.month) ? padNumber(date.month) : ''}/${date.year}` :
            '';
    }
}
