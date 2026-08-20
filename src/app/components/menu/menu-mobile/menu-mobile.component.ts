import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IMenu } from '../../../interfaces/menu.interface';
import { AppMenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-menu-mobile',
  imports: [CommonModule, MatIconModule],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class MenuMobileComponent {
  menuList: IMenu[] = []; // Список меню

  constructor(
    private menuS: AppMenuService
  ){
    this.menuList = this.menuS.getListMenu(true);
  }

  goToMenu(m: IMenu){
    this.menuS.goToMenu(m);
  }

}
