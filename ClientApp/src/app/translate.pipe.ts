import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { GlobalRef } from './global-ref';

@Injectable()
@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {
    constructor(private globalRef: GlobalRef) { }
    transform(query: string): any {
        return (<any>this.globalRef.nativeGlobal.appData.content)[query] || query;
    }
}
