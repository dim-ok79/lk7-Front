import { Component, ViewEncapsulation } from '@angular/core';
import { NgbdToastGlobal } from '../../../utils/toast/toast-global.component';
import { AuthService } from '../../../services/auth.service';
import { IMenu } from '../../../interfaces/menu.interface';
import { AppMenuService } from '../../../services/menu.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-pc',
  imports: [RouterModule, CommonModule],
  templateUrl: './home-pc.component.html',
  styleUrl: './home-pc.component.scss',
  providers: [NgbdToastGlobal],
  encapsulation: ViewEncapsulation.None

})
export class HomePcComponent {
  menuList: IMenu[] = []; // Список меню

  constructor(
    private alert: NgbdToastGlobal,
    private auth: AuthService,
    private menuS: AppMenuService
  ){
    this.menuList = this.menuS.getListMenu();

  }

  goToMenu(m: IMenu){
    this.menuS.goToMenu(m);
  }

  logout(){
    this.auth.logout();
  }

}
