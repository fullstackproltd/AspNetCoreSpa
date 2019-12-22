import { ShopComponent } from './shop.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';

export const routes = [
  {
    path: '',
    component: ShopComponent,
    data: { displayText: 'Shop' },
    children: [
      { path: '', redirectTo: 'customers' },
      { path: 'customers', component: CustomersComponent, data: { state: 'customers', displayText: 'Customers' } },
      { path: 'products', component: ProductsComponent, data: { state: 'products', displayText: 'Products' } },
    ],
  },
];
