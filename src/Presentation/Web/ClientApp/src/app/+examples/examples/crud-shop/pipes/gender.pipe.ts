import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from '../crud-shop.models';

@Pipe({
    name: 'gender'
})

export class GenderPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        switch (value) {
            case Gender.Male:
                return 'Male';
            case Gender.Female:
                return 'Female';
            default:
                return 'None';
        }
    }
}
