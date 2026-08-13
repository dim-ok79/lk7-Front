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
    let p_podmenu: IMenu[] | null = null;
    p_podmenu = null;
    p_podmenu = [];
    p_podmenu = [...p_podmenu, {id:1, name:'Мои посещения' , active: false, url: 'home/recmy'}];
    p_podmenu = [...p_podmenu, {id:2, name:'Запись на прием к врачу' , active: false, url: ''}];
    p_podmenu = [...p_podmenu, {id:3, name:'Запись на телемедицинскую консультацию' , active: false, url: ''}];
    this.menuList.push({id: 1, name: 'Запись к врачу', active: false, url: 'home/record', svgName: 'recdoc', submenu: p_podmenu});
    this.menuList.push({id: 2, name: 'Медицинские документы', active: false, url: 'home/rec', svgName: 'meddoc'});
    this.menuList.push({id: 3, name: 'Финансы', active: false, url: 'home/payments', svgName: 'fin'});
    this.menuList.push({id: 4, name: 'Отправить отзыв', active: false, url: 'home/rec', svgName: 'review'});
    this.menuList.push({id: 5, name: 'Полезная информация', active: false, url: 'home/rec', svgName: 'info'});

    this.menuList.push({id: 2, name: 'login', active: false, url: 'login'});
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
