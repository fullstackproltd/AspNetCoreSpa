import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    public pageTitle = 'Product Detail';
    public product: IProduct;
    public errorMessage: string;
    public sub: Subscription;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public productService: ProductService) {
    }

    public ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                const id = params['_id'];
                this.getProduct(id);
            });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public getProduct(id: string) {
        this.productService.getProduct(id).subscribe(
            product => this.product = product,
            // tslint:disable-next-line:whitespace
            error => this.errorMessage = <any>error);
    }

    public onBack(): void {
        this.router.navigate(['examples/reactiveforms']);
    }

    public onRatingClicked(message: string): void {
        this.pageTitle = 'Product Detail: ' + message;
    }
}
