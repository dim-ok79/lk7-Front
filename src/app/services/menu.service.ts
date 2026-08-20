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
    this.menuList.push({id: 1, name: 'Запись на прием', active: false, url: 'home/record', svgName: 'rec', svgNameColor: 'rec_color', mobile_only: false});
    this.menuList.push({id: 2, name: 'Мои посещения', active: false, url: 'home/recmy', svgName: 'myrec', svgNameColor: 'myrec_color', mobile_only: false});
    this.menuList.push({id: 3, name: 'Медицинская карта', active: false, url: 'home/rec', svgName: 'medcard', svgNameColor: 'medcard_color', mobile_only: false});
    this.menuList.push({id: 4, name: 'Финансы', active: false, url: 'home/payments', svgName: 'fin', svgNameColor: 'fin_color', mobile_only: false});
    this.menuList.push({id: 5, name: 'Мой профиль', active: false, url: 'home/account', svgName: '', svgNameColor: 'myprofil_color', mobile_only: true});
    this.menuList.push({id: 6, name: 'Акции', active: false, url: 'home/payments', svgName: '', svgNameColor: 'action_color', mobile_only: true});
    this.menuList.push({id: 7, name: 'Полезная информация', active: false, url: 'home/payments', svgName: '', svgNameColor: 'info_color', mobile_only: true});
    this.menuList.push({id: 8, name: 'Выход', active: false, url: 'login', svgName: '', svgNameColor: 'exit_color', mobile_only: true});


    /*
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
    */
  }

  getListMenu(pMobileOnly: boolean = false): IMenu[] {
    if (pMobileOnly) {
      return this.menuList
    } else {
      return this.menuList.filter(item => item.mobile_only == false);
    }
  }

  goToMenu(m: IMenu){
    this.menuList.forEach(item =>
      item.active = (m.id == item.id)
    );
    this.router.navigate([m.url]);  // Переход
  }


}
