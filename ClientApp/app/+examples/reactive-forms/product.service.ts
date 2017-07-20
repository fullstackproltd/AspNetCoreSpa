import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { IProduct } from './product';
import { DataService } from '../../core/services/data.service';

@Injectable()
export class ProductService {
    private baseUrl = 'api/product';

    constructor(private dataService: DataService) { }

    public getProducts(): Observable<any> {
        return this.dataService.get(this.baseUrl);
    }

    public getProduct(id: string): Observable<any> {
        if (id === '0') {
            return Observable.of(this.initializeProduct());
        }
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.get(url);
    }

    public deleteProduct(id: string): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.dataService.delete(url);
    }

    public saveProduct(product: IProduct): Observable<Response> {
        if (product._id === '0') {
            return this.createProduct(product);
        }
        return this.updateProduct(product);
    }

    private createProduct(product: IProduct): Observable<Response> {
        product._id = '';
        return this.dataService.post(this.baseUrl, product);
    }

    private updateProduct(product: IProduct): Observable<Response> {
        const url = `${this.baseUrl}/${product._id}`;
        return this.dataService.put(url, product);
    }

    private initializeProduct(): IProduct {
        // Return an initialized object
        return {
            _id: '0',
            productName: '',
            productCode: '',
            tags: [''],
            releaseDate: '',
            price: 0,
            description: '',
            starRating: 0,
            imageUrl: ''
        };
    }
}
