import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IMenu } from '../../interfaces/menu.interface';
import { AppMenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class MenuComponent {
  menuList: IMenu[] = []; // Список меню
  @Input() isMobile: boolean = false;  // Показывать для мобильного

  constructor(
    private menuS: AppMenuService
  ){
    this.menuList = this.menuS.getListMenu();
  }

  goToMenu(m: IMenu){
    this.menuS.goToMenu(m);
  }

}
