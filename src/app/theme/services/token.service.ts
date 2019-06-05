import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http, RequestOptions, Headers} from '@angular/http';
import {ShareService} from './share.service';
import swal from 'sweetalert2';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class TokenService {
  static TOKEN_KEY = 'AccessToken';
  static TOKEN_EXPIRES = 'Expires';
  currentUser: any;
  isAdmin: any;
  headers: any;
  public login = new Subject<any>();
  constructor(private http: Http,
              private shareService: ShareService, private router: Router) {
    this.isAuthenticated();
    this.getInfo();
    this.isAdmin = false;
    this.headers = new Headers();
    this.headers.append('Authorization', this.getToken() == null ?null : this.getToken());
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-type', 'application/json');
  }
  /** Get information basic of user */
  getInfo() {
    if (this.getToken() == null) {
      this.currentUser = null;
      return;
    }
    let headers;
    headers = new Headers();
    headers.append('Authorization', this.getToken());
    let options;
    options = new RequestOptions({
      headers: headers
    });
    this.http.get(environment.hostname + '/user', options).map(res => res.json()).subscribe((data: any) => {
     this.currentUser = data;
      for (const authority of data.authorities) {
        if (authority.authority  === 'ROLE_ADMIN') {
          this.isAdmin = true;
        }
      }
    }, (err: any) => {
      if (err.status === 401) {
        this.refreshToken().subscribe((data: any) => {
          this.setToken(data);
          this.getInfo();
          this.shareService.loginToken(this.currentUser);
        }, (err2: any) => {
          if (err2.status === 401) {
            swal('Thông báo', 'Mời bạn đăng nhập lại!', 'error');
            this.removeToken();
            this.shareService.loginToken(null);
          }
        });
      }
    });
  }

  getDataWithToken(url) {
    alert(this.headers.get('Authorization'));
    return this.http.get(url, {
      headers: this.headers
    }).map(res => res.json());
  }
  postDataWithToken(url, data) {
    return this.http.post(url, data, {
      headers: this.headers
    }).map(res => res.json());
  }
  putDataWithToken(url, data) {
    return this.http.put(url, data, {
      headers: this.headers
    }).map(res => res.json());
  }
  deleteDataWithToken(url) {
    return this.http.delete(url, {
      headers: this.headers
    }).map(res => res.json());
  }
  getRole() {
    const url = environment.hostname + '/role';
    let headers;
    headers = new Headers();
    headers.append('Authorization', this.getToken());
    let options;
    options = new RequestOptions({
      headers: headers
    });
    return this.http.get(url, options).map(res => res.json());
  }
  isRoleAdmin() {
    if (this.isAdmin) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  isAuthenticated() {
    if(this.getToken() != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
    // this.getRole().subscribe((data: any) => {
    //   for (const item of data) {
    //     if (item.authority  === 'ROLE_ADMIN' || item.authority === 'ROLE_SUPPLIER') {
    //       return true;
    //     }
    //   }
    //   this.router.navigate(['/login']);
    //   return false;
    // }, (err: any) => {
    //   if (err.status === 401) {
    //     this.refreshToken().subscribe((data: any) => {
    //       this.setToken(data);
    //     }, err2 => {
    //       this.router.navigate(['/login']);
    //     });
    //   }
    // });
  }
  isLogged() {
    if (this.getToken() != null) {
      return true;
    }
    return false;
  }
  getToken() {
    return Cookie.get(TokenService.TOKEN_KEY);
  }
  refreshToken() {
  console.log('Refresh');
    const url = environment.hostname + '/refresh';
    let headers;
    headers = new Headers();
    headers.append('Authorization', this.getToken());
    return this.http.get(url, {
      headers: headers
    }).map(res => res.json());
  }
  setToken(token) {
    Cookie.set(TokenService.TOKEN_KEY, token.data.token, token.data.expire / 3600);
    this.headers = new Headers();
    this.headers.append('Authorization', this.getToken());
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-type', 'application/json');
  }
  removeToken() {
    Cookie.delete(TokenService.TOKEN_KEY);
  }
}
