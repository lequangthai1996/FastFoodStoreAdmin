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
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {ProfileComponent} from "./components/profile.component";
import {AdminGuard} from "../../theme/security/admin.guard";
import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import {FileSelectDirective} from 'ng2-file-upload';
import {FileUploadModule} from 'ng2-cloudinary/dist/esm/src/cloudinary-uploader.service';

const DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'http://localhost:9000/upload/images',
  maxFilesize: 1,
  acceptedFiles: 'image/*',
  addRemoveLinks: true,
  thumbnailWidth: 300,
  thumbnailHeight: 300,
  thumbnailMethod: 'contain'
};
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
    NgxPaginationModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    DropzoneModule.forRoot(DROPZONE_CONFIG),
  ],
  declarations: [
    UsersComponent,
    CustomerListComponent,
    SupplierListComponent,
    AdminListComponent,
    AdminDetailComponent,
    ProfileComponent
    ],
  providers: [
    DataTablesService, AdminGuard
  ],
})
export class UsersModule {
}
