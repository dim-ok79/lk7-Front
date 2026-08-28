import { Component, inject, ViewEncapsulation } from '@angular/core';
import { AppMenuService } from '../../services/menu.service';
import { IMenu } from '../../interfaces/menu.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-servise-top',
  imports: [CommonModule, MatIconModule],
  templateUrl: './servise-top.component.html',
  styleUrl: './servise-top.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class ServiseTopComponent {
  private menuS = inject(AppMenuService);

  menuList: IMenu[] = []; // Список меню

  constructor(
  ){
    this.menuList = this.menuS.getListMenuTop();
  }

  goToMenu(m: IMenu){
    this.menuS.goToMenu(m);
  }

}
