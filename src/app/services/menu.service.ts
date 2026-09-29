import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from '../interfaces/menu.interface';
import { Size } from './size';

@Injectable({
  providedIn: 'root'
})

export class AppMenuService {
  menuList: IMenu[] = []; // Список меню
  private router = inject(Router);
  private sizeS = inject(Size);
  deviceType = signal<string>('');

  constructor(
              ) {
    this.menuList.push({id: 1, name: 'Запись на прием', active: false, url: '/record', svgName: 'rec', svgNameColor: 'rec_color', mobile_only: false, top: true});
    this.menuList.push({id: 2, name: 'Мои посещения', active: false, url: '/recmy', svgName: 'myrec', svgNameColor: 'myrec_color', mobile_only: false, top: true});
    this.menuList.push({id: 3, name: 'Медицинские документы', active: false, url: '/my-doc', svgName: 'medcard', svgNameColor: 'medcard_color', mobile_only: false, top: true});
    this.menuList.push({id: 4, name: 'Финансы', active: false, url: '/payments', svgName: 'fin', svgNameColor: 'fin_color', mobile_only: false, top: true});
    this.menuList.push({id: 5, name: 'Мой профиль', active: false, url: '/account', svgName: '', svgNameColor: 'myprofil_color', mobile_only: true, top: false});
    this.menuList.push({id: 6, name: 'Акции', active: false, url: '/actions', svgName: '', svgNameColor: 'action_color', mobile_only: true, top: false});
    this.menuList.push({id: 7, name: 'Полезная информация', active: false, url: '/plz-info', svgName: '', svgNameColor: 'info_color', mobile_only: true, top: false});
    this.menuList.push({id: 8, name: 'Выход', active: false, url: 'login', svgName: '', svgNameColor: 'exit_color', mobile_only: true, top: false});

    this.deviceType.set(this.sizeS.getDeviceType());
    console.log('!!!!=', this.deviceType());
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

  getListMenuTop(): IMenu[] {
      return this.menuList.filter(item => item.top == true);
  }


  goToMenu(m: IMenu){
    this.menuList.forEach(item =>
      item.active = (m.id == item.id)
    );
    let host = 'home';
    if (this.deviceType() == this.sizeS.mobile){
      host = 'home-mobile';
    }

    if (m.url == 'login'){
      this.router.navigate([m.url]);  // Переход
    } else {
      this.router.navigate([`${host}/`+m.url]);  // Переход
    }
  }


}
