import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {environment} from 'environments/environment';
import {TokenService} from './token.service';

@Injectable()
export class ItemService {

    constructor(private http: Http, private tokenService: TokenService) {
    }

  getItemByOrder(id) {
    return this.tokenService.getDataWithToken(environment.hostname + '/orderItem/getItemByOrder/' + id);
  }
    getItemTool() {
        return this.tokenService.getDataWithToken(environment.hostname + '/item/getItemTool?quantity=9');
    }

    getItemPromotion() {
        return this.tokenService.getDataWithToken(environment.hostname + '/item/getItemPromotion?quantity=5');
    }

    getItemNew() {
        return this.tokenService.getDataWithToken(environment.hostname + '/item/getItemNew?quantity=9');
    }

    getItemBest() {
        return this.tokenService.getDataWithToken(environment.hostname + '/item/getItemBest');
    }

    getItemById(id: number) {
        return this.tokenService.getDataWithToken(environment.hostname + '/item/getItemById/' + id);
    }

    getItemRelated(id: number) {
        return this.tokenService.getDataWithToken(environment.hostname + '/category/items/' + id + '?page=0&size=4');
    }

    getImageOfItem(id: number) {
        return this.tokenService.getDataWithToken(environment.hostname + '/images/item/' + id);
    }

    getCateByItem(id: number) {
        return this.tokenService.getDataWithToken(environment.hostname + '/item/getCategory/' + id);
    }

    search(key: string, page: number , size: number) {
        return this.tokenService.getDataWithToken(environment.hostname + '/item/search?key=' + key + '&page=' + page + '&size=' + size)
            ;
    }
    filterOfSupplier(key: string, supplierId: number) {
      return this.tokenService.getDataWithToken(`${environment.hostname}/item/search/supplier/${supplierId}?key=${key}`)
        ;
    }
}
