import { Injectable, signal } from '@angular/core';
import { IBtnMyRec } from '../interfaces/recmy.interface';

@Injectable({
  providedIn: 'root'
})

export class MyDocService {
  // Список типов
  private typeDocList = signal<IBtnMyRec[]>([
      {id: 1, name: 'Заключения', active: true},
      {id: 2, name: 'Анализы', active: false},
      {id: 3, name: 'Исследования', active: false},
      {id: 4, name: 'Профосмотры', active: false},
      {id: 5, name: 'Мои документы', active: false}
    ]);


  constructor(
  ) {
  }

  getList(): IBtnMyRec[] {
      return this.typeDocList()
  }

  onClickType(id: number) {
    this.typeDocList.update(list =>
      list.map(item =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      )
    );
  };

  /* Текущий тип */
  getCurrentTypeDoc(): IBtnMyRec{
    return this.typeDocList().filter(item => item.active)[0];
  }


}
