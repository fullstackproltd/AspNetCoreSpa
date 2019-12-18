import { PipeTransform, Pipe, Injectable } from '@angular/core';

import { AppService } from '@app/services';

@Injectable()
@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {
    constructor(private appService: AppService) { }
    transform(query: string): any {
        return this.appService.appData.content[query] || query;
    }
}
