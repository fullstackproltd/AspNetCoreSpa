import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { parseISO } from 'date-fns';

@Injectable()
export class CustomNgbDateNativeUTCAdapter extends NgbDateAdapter<Date> {
    fromModel(date: Date | string): NgbDateStruct {
        if (date instanceof Date) {

            return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
        }

        if (typeof date === 'string') {
            const parsedDate = parseISO(date);
            return { year: parsedDate.getUTCFullYear(), month: parsedDate.getUTCMonth() + 1, day: parsedDate.getUTCDate() };
        }

        return null;
    }

    toModel(date: NgbDateStruct): Date {
        return date && date.year && date.month ? new Date(Date.UTC(date.year, date.month - 1, date.day)) : null;
    }
}
