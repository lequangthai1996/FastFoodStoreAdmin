import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';

@Injectable()
export class UnitService {
  constructor(private http: Http) {
  }
  getListUnit() {
    return this.http.get(environment.hostname + '/unit/').map(res => res.json());
  }
}
