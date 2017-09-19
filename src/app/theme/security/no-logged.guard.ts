import {CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import {TokenService} from '../services/token.service';
import {ShareService} from '../services/share.service';

@Injectable()
export class NoLoggedGuard implements CanActivate {

  private can = false;
  constructor(private tokenService: TokenService,
              private shareService: ShareService,
              private router: Router) {

  }
  canActivate() {
    if (!this.tokenService.isLogged()) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
