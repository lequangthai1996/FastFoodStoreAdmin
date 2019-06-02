import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { HttpModule } from '@angular/http';
import { routing } from './products.routing';
import { InputProductComponent } from './components/Input/inputProduct.component';
import { ProductsComponent } from './products.component';
import { TablesModule } from '../tables/tables.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {CategoryService} from '../../theme/services/category.service';
import {UnitService} from '../../theme/services/unit.service';
import {TokenService} from '../../theme/services/token.service';
import {ShareService} from '../../theme/services/share.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProductListComponent} from './components/List/productList.component';
import {ItemService} from '../../theme/services/item.service';

const DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'http://localhost:9000/upload/images',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  addRemoveLinks: true
};
@NgModule({
  imports: [
    NgaModule,
    HttpModule,
    FormsModule,
    CommonModule,
    TablesModule,
    ReactiveFormsModule,
    routing, CKEditorModule,
    DropzoneModule.forRoot(DROPZONE_CONFIG),
    NgxPaginationModule
  ],
  declarations: [
    ProductsComponent,
    InputProductComponent,
    ProductListComponent
    ],
  providers: [
    CategoryService, UnitService, TokenService, ShareService, ItemService
  ],
})
export class ProductsModule {
}
