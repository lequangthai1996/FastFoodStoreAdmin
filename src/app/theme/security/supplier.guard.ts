import {CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import {TokenService} from '../services/token.service';

@Injectable()
export class SupplierGuard implements CanActivate {

  private admin = false;
  constructor(private tokenService: TokenService,
              private router: Router) {
  }
  canActivate() {
    console.log(this.tokenService.currentUser);
    if (this.tokenService.isAdmin === true) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
