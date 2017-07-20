import { NgModule } from '@angular/core';

import { StarComponent } from './components/star.component';
import { SharedModule } from './../../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';
import { routing } from './product.routes';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductFilterPipe,
    StarComponent
  ],
  providers: [
    ProductService,
    ProductDetailGuard,
    ProductEditGuard
  ]
})
export class ReactiveFormsExampleModules { }
