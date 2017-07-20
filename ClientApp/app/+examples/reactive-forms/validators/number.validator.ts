import { AbstractControl } from '@angular/forms';

export class NumberValidators {

    public static range(min: number, max: number): any {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { range: true };
            }
            return null;
        };
    }
}
