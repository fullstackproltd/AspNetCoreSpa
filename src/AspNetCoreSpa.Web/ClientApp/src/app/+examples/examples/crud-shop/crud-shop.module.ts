import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';

import { CrudShopComponent } from './crud-shop.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { CustomersService } from '@app/+examples/examples/crud-shop/customers/customers.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: CrudShopComponent, children: [
          { path: '', redirectTo: 'customers' },
          { path: 'customers', component: CustomersComponent },
          { path: 'product-categories', component: ProductCategoriesComponent },
          { path: 'products', component: ProductsComponent },
          { path: 'orders', component: OrdersComponent },
        ]
      }
    ])
  ],
  providers: [CustomersService],
  declarations: [CrudShopComponent, CustomersComponent, ProductsComponent, OrdersComponent, ProductCategoriesComponent]
})
export class CrudShopModule { }
