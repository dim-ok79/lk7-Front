import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {compToPagination} from "../../../services/compToPagination";
import { getStrEnd } from '../../../utils/global.function';
import { CommonModule} from '@angular/common';

export interface Ipage {
  name: string;
  num: number;
  active?: boolean;
}

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  providers:[compToPagination],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {
  @Input() currentPage = 1; // Текущая страница
  @Input() textItogo = ''; // Текст ИТОГО:
  @Input() textItogoStrEnd = []; // окончания, если пустой массив то не применяем

  @Input()
  set countRec(value: number) {
    this._countRec = value;
    this.countPage = Math.round(this._countRec / this.countRecPage);
    this.generPageName(this.currentPage);
  }

  get countRec():number {
    return this._countRec;
  }

  @Input() countRecPage = 1;   // Количество записе на странице
  @Output() onChangedPage = new EventEmitter<number>(); // выбрана страница

  _countRec = 0; // Всего записей

  countPage = 0;   // Количество страниц
  maxSizePage = 7; // Максимально кол страниц (с учетом точек)

  Arr = Array(this.maxSizePage);

  arrayPage: Ipage[] = [];

  constructor(private cToP: compToPagination) {
    cToP.onChangedPage$().subscribe(n =>{
// console.log('EMMIT onChangedPage countPage=', n);
        this.goPage(n);
        this.currentPage = n;
        this.generPageName(this.currentPage);
      });
  }

  ngOnInit(): void {
//    console.log('countRecPage=', this.countRecPage);
  }

/* Добавление номера */
  private addPage(pNum: number) {
    if (pNum > 0) {
      this.arrayPage.push({name: pNum+'', num: pNum});
    } else {
      this.arrayPage.push({name: '...', num: 0});
    }
  }

/* Генерация номеров страниц
* num - на какую страницу перешли */
  generPageName(num: number, sendEvent?: boolean) {
    this.arrayPage = [];
    this.currentPage = num;
    if (sendEvent) {
      this.onChangedPage.emit(this.currentPage);
    }
    if (this.countPage > 7) {                                                            // Количество страниц, больше, необходимо вывести ТЧК
      // левая часть (3) + центр (1)
      if (this.currentPage <= 4) {                                                       // Не выводить с лева ТЧК
        for (let i = 1; i <= 4; i++) {
          this.addPage(i);
        }
      } else {                                                                           // Вывод с ТЧК
        this.addPage(1);
        this.addPage(0);
        if (this.currentPage >= this.countPage-3) { /// !!!!
          this.addPage(this.countPage-4);
          this.addPage(this.countPage-3);
        } else {
          this.addPage(this.currentPage-1);
          this.addPage(this.currentPage);
        }
      }
//console.log('1-this.arrayPage=', Object.assign({},this.arrayPage));
      // правая часть(3)
      if (this.currentPage >= this.countPage-3) {
        this.addPage(this.countPage-2);
        this.addPage(this.countPage-1);
        this.addPage(this.countPage);
      } else {
        if (this.currentPage <= 4) {
          this.addPage(5);
        } else {
          this.addPage(this.currentPage+1);
        }
        this.addPage(0);
        this.addPage(this.countPage);
      }
// console.log('3-this.arrayPage=', Object.assign({},this.arrayPage));

    } else {                                                                                 // Вывод всех страниц
      for (let i = 1; i <= this.countPage; i++) {
        this.addPage(i);
//        this.arrayPage.push({name: i+'', num: i+1});
      }
    }
/*
console.log('this.currentPage=', this.currentPage);
console.log('this.countPage=', this.countPage);
console.log('this.arrayPage=', this.arrayPage);
*/
  }

  nextPage() {
    if (this.currentPage !== this.countPage) {
      this.currentPage ++;
      if (this.currentPage >= this.countPage-2) {
        this.onChangedPage.emit(this.currentPage);
      } else {
        this.generPageName(this.currentPage, true);
      }
    }
  }

  prevPage() {
    if (this.currentPage >1 ) {
      this.currentPage --;
      this.generPageName(this.currentPage, true);
    }
  }

  goPage(num: number) {
    if (num > 0) { // Исключаем ТЧК
      this.currentPage = num;
      this.generPageName(this.currentPage, true);
    }
  }

  getTextItogo(): string {
    if (this.textItogoStrEnd && this.textItogoStrEnd.length == 3){
      return getStrEnd(this._countRec ,this.textItogo,this.textItogoStrEnd);
    } else {
      return this.textItogo;
    }
  }

}
