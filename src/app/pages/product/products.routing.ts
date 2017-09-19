import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { InputProductComponent } from './components/Input/inputProduct.component';
import {ProductListComponent} from './components/List/productList.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: 'input', component: InputProductComponent },
      { path: 'list', component: ProductListComponent },
      { path: 'detail/:id', component: InputProductComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
