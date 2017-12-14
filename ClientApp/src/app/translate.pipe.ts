import { PipeTransform, Pipe, Injectable, Inject } from '@angular/core';
import { APP_DATA } from './appData';

@Injectable()
@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {
    constructor( @Inject(APP_DATA) private appData: IApplicationConfig) { }
    transform(query: string): any {
        return this.appData.content[query] || query;
    }
}
