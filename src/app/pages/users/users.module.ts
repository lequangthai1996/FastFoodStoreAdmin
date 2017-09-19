import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { HttpModule } from '@angular/http';
import { routing } from './users.routing';
import { UsersComponent } from './users.component';
import { CustomerListComponent } from './components/Customer/customerList.component';
import { DataTablesService } from '../tables/components/dataTables/dataTables.service';
import { DataTableModule } from 'angular2-datatable';
import { SupplierListComponent } from './components/Supplier/supplierList.component';
import { AdminListComponent } from './components/Admin/adminList.component';
import {PagerModule} from 'ng2-smart-table/components/pager/pager.module';
import {TablesModule} from '../tables/tables.module';
import {AdminDetailComponent} from './components/Admin/adminDetail.component';
import {NG2DataTableModule} from 'angular2-datatable-pagination';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    NgaModule,
    HttpModule,
    FormsModule,
    DataTableModule,
    CommonModule,
    PagerModule,
    routing,
    TablesModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    UsersComponent,
    CustomerListComponent,
    SupplierListComponent,
    AdminListComponent,
    AdminDetailComponent,
    ],
  providers: [
    DataTablesService
  ],
})
export class UsersModule {
}
