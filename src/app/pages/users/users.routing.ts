import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { CustomerListComponent } from './components/Customer/customerList.component';
import { SupplierListComponent } from './components/Supplier/supplierList.component';
import { AdminListComponent } from './components/Admin/adminList.component';
import {AdminDetailComponent} from './components/Admin/adminDetail.component';
import {ProfileComponent} from './components/profile.component';
import {AdminGuard} from "../../theme/security/admin.guard";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'customer', component: UsersComponent, children: [
        { path: '', component: CustomerListComponent },
        { path: 'detail/:id', component: AdminDetailComponent },
        { path: 'new', component: AdminDetailComponent },
      ], canActivate: [AdminGuard] },
      { path: 'supplier', component: UsersComponent, children: [
        { path: '', component: SupplierListComponent },
        { path: 'detail/:id', component: AdminDetailComponent },
        { path: 'new', component: AdminDetailComponent },
      ], canActivate: [AdminGuard] },
      { path: 'admin', component: UsersComponent, children: [
        { path: '', component: AdminListComponent },
        { path: 'detail/:id', component: AdminDetailComponent },
        { path: 'new', component: AdminDetailComponent },
      ],
      canActivate: [AdminGuard]},
      { path: 'detail/:id', component: AdminDetailComponent, canActivate: [AdminGuard] },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
