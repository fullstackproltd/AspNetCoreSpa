import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';

const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'product/:_id', canActivate: [ProductDetailGuard], component: ProductDetailComponent },
    { path: 'productEdit/:_id', canDeactivate: [ProductEditGuard], component: ProductEditComponent }
];

export const routing = RouterModule.forChild(routes);
