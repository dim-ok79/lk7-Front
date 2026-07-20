import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IMenu } from '../../../interfaces/menu.interface';
import { CommonModule } from '@angular/common';
import { AppMenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-home-mobile',
  imports: [NgbModule, CommonModule],
  templateUrl: './home-mobile.component.html',
  styleUrl: './home-mobile.component.scss'
})
export class HomeMobileComponent {
  isMenuCollapsed = true;

  menuList: IMenu[] = []; // Список меню

  constructor(private menuS: AppMenuService
  ){
    this.menuList = this.menuS.getListMenu();
  }

  goToMenu(m: IMenu){
    this.menuS.goToMenu(m);
    this.isMenuCollapsed = true;
  }

}
