import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

import { NumberValidators } from '../validators/number.validator';
import { GenericValidator } from '../validators/generic-validator';

@Component({
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
    // tslint:disable-next-line:member-access
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: QueryList<any>;

    public pageTitle = 'Product Edit';
    public errorMessage: string;
    public productForm: FormGroup;
    public product: IProduct;
    public sub: Subscription;
    // Use with the generic validation message class
    public displayMessage: any = {};
    public validationMessages: any = {};
    public genericValidator: GenericValidator;

    public get tags(): FormArray {
        // tslint:disable-next-line:whitespace
        return <FormArray>this.productForm.get('tags');
    }

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            productName: {
                required: 'Product name is required.',
                minlength: 'Product name must be at least three characters.',
                maxlength: 'Product name cannot exceed 50 characters.'
            },
            productCode: {
                required: 'Product code is required.'
            },
            starRating: {
                range: 'Rate the product between 1 (lowest) and 5 (highest).'
            }
        };

        // Define an instance of the validator for use with this form,
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    public ngOnInit(): void {
        this.productForm = this.fb.group({
            productName: ['', [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]],
            productCode: ['', Validators.required],
            starRating: ['', NumberValidators.range(1, 5)],
            tags: this.fb.array([]),
            description: ''
        });

        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                const id = params['_id'];
                this.getProduct(id);
            }
        );
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        const controlBlurs = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable
            .merge(this.productForm.valueChanges, ...controlBlurs)
            .debounceTime(800)
            .subscribe(value => {
                this.displayMessage = this.genericValidator.processMessages(this.productForm);
            });
    }

    public addTag(): void {
        this.tags.push(new FormControl());
    }

    public getProduct(id: string): void {
        this.productService.getProduct(id)
            .subscribe(
            (product: IProduct) => this.onProductRetrieved(product),
            // tslint:disable-next-line:whitespace
            (error: any) => this.errorMessage = <any>error
            );
    }

    public onProductRetrieved(product: IProduct): void {
        if (this.productForm) {
            this.productForm.reset();
        }
        this.product = product;

        if (this.product._id === '0') {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }

        // Update the data on the form
        this.productForm.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            description: this.product.description
        });
        this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    }

    public deleteProduct(): void {
        if (this.product._id === '0') {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product._id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    // tslint:disable-next-line:whitespace
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    public saveProduct(): void {
        if (this.productForm.dirty && this.productForm.valid) {
            // Copy the form values over the product object values
            const p = Object.assign({}, this.product, this.productForm.value);

            this.productService.saveProduct(p)
                .subscribe(
                () => this.onSaveComplete(),
                // tslint:disable-next-line:whitespace
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.productForm.dirty) {
            this.onSaveComplete();
        }
    }

    public onSaveComplete(): void {
        // Reset the form to clear the flags
        this.productForm.reset();
        this.router.navigate(['examples/reactiveforms']);
    }
}
