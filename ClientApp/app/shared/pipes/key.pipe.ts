import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'keys'
})
export class KeysPipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        if (!value) {
            return value;
        }

        const keys = [];
        for (const key in value) {
            if (key) {
                keys.push({
                    key: key,
                    value: value[key]
                });
            }
        }
        return keys;
    }
}
