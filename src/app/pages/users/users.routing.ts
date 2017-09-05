import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { CustomerListComponent } from './components/Customer/customerList.component';
import { SupplierListComponent } from './components/Supplier/supplierList.component';
import { AdminListComponent } from './components/Admin/adminList.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'customer', component: CustomerListComponent },
      { path: 'supplier', component: SupplierListComponent },
      { path: 'admin', component: AdminListComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
