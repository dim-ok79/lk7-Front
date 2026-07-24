import { Injectable } from '@angular/core';
import { ConfigService } from './application/config.service';
import { Router } from '@angular/router';
import { IMenu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})

export class AppMenuService {
  menuList: IMenu[] = []; // Список меню

  constructor(private configS: ConfigService,
              private router: Router) {
    this.menuList.push({id: 1, name: 'home', active: false, url: 'home'});
    this.menuList.push({id: 2, name: 'login', active: false, url: 'login'});
    this.menuList.push({id: 3, name: 'sdfg3erg', active: false});
  }

  getListMenu(): IMenu[] {
    return this.menuList
  }

  goToMenu(m: IMenu){
    this.menuList.forEach(item =>
      item.active = (m.id == item.id)
    );
    this.router.navigate([m.url]);  // Переход
  }


}
