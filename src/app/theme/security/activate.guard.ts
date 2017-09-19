import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ActivateGuard implements CanActivate {

  private can = false;
  constructor(private router: Router) {

  }
  canActivate() {
    // swal('Thông báo', 'Mời bạn đăng nhập', 'error');
     this.router.navigate(['/login']);
    return false;
  }
}
