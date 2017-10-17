import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public imgageProfile = './assets/img/app/profile/Nick.png';
  constructor(private _state:GlobalState, private tokenService: TokenService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    setTimeout(() => {
      this.imgageProfile = this.tokenService.currentUser.avatar != null ?
        this.tokenService.currentUser.avatar : this.imgageProfile;
    }, 1000);
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
