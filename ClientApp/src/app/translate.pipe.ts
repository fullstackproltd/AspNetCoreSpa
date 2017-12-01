import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { GlobalRef } from './services/global-ref';

@Injectable()
@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {
    constructor(
        private globalRef: GlobalRef
    ) { }
    transform(query: string, ...args: any[]): any {
        if (!query || query.length === 0) {
            return query;
        }

        return query;
        // return (<any>this.globalRef.nativeGlobal.appData.content)[query] || query;
    }
}
