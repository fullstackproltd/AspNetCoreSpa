import { Pipe } from '@angular/core';

@Pipe({
    name: 'sd-uppercase'
})
export class UppercasePipe {
    transform(value: string) {
        return value.toUpperCase();
    }
}
