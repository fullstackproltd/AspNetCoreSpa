import { PipeTransform, Pipe } from '@angular/core';
import { IProduct } from './product';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({
    // tslint:disable-next-line:pipe-naming
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

    public transform(value: IProduct[], filterBy: string): IProduct[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : '';
        return filterBy ? value.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
