import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import {ActivateGuard} from '../theme/security/activate.guard';
import {DataFilterPipe} from './tables/components/dataTables/data-filter.pipe';
import {TokenService} from '../theme/services/token.service';
import {ShareService} from '../theme/services/share.service';

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [Pages],
  providers: [ActivateGuard, TokenService, ShareService]
})
export class PagesModule {
}
