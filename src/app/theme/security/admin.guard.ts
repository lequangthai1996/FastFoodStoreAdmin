import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import {TokenService} from '../services/token.service';

@Injectable()
export class AdminGuard implements CanActivate {

  private admin = false;
  constructor(private tokenService: TokenService,
              private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('Admin Guard');
    this.tokenService.isRoleAdmin();
    return true;
  }
}
