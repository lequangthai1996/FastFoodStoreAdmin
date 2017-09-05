import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { HttpModule } from '@angular/http';
import { routing } from './users.routing';
import { UsersComponent } from './users.component';
import { CustomerListComponent } from './components/Customer/customerList.component';
import { DataTablesService } from '../tables/components/dataTables/dataTables.service';
import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from '../tables/components/dataTables/data-filter.pipe';
import { SupplierListComponent } from './components/Supplier/supplierList.component';
import { AdminListComponent } from './components/Admin/adminList.component';

@NgModule({
  imports: [
    NgaModule,
    HttpModule,
    FormsModule,
    DataTableModule,
    CommonModule,
    routing,
  ],
  declarations: [
    UsersComponent,
    CustomerListComponent,
    SupplierListComponent,
    AdminListComponent,
    DataFilterPipe,
    ],
  providers: [
    DataTablesService,
  ],
})
export class UsersModule {
}
