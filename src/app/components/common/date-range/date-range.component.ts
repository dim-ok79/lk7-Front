import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import {IDateRange, IDateRangeHeader} from "../../../interfaces/date-range.interface";
import moment from 'moment';
import {DateRangeService} from "../../../services/date-range.service";
import {IPeriod} from "../../../interfaces/period.interface";
import { TableDayComponent } from './table-day/table-day.component';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';

const tableLeftPrefix = 'dtLeft';
const tableRightPrefix = 'dtRight';

@Component({
  selector: 'app-date-range',
  imports:[CommonModule, MatIconModule, TableDayComponent],
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent implements OnInit {
  public dt: IDateRange;
//  private cdr = inject(ChangeDetectorRef);

  isShown = signal(false); // Показ календаря

  @Output() onChanged = new EventEmitter<IPeriod>(); // Смена даты
  @Input()      // Дата начала
  set dtBegin(value: Date | null) {
    this.dt.dt_begin = value;
    this.setHeaderBtn();
    this.drs.CalendarySetDateRange(this.dt);
  }

  get dtBegin(): Date | null{
    return this.dt.dt_begin;
  }

  @Input() // Дата окончания
  set dtEnd(value: Date | null) {
    this.dt.dt_end = value;
    this.setHeaderBtn();
    this.drs.CalendarySetDateRange(this.dt);
  }

  get dtEnd(): Date | null{
    return this.dt.dt_end;
  }

  headerLeft: IDateRangeHeader  = {mount: '', year: 0, dt: new Date(), left:true, right:true, prefix: tableLeftPrefix};
  headerRight: IDateRangeHeader  = {mount: '', year: 0, dt: new Date(), left:true, right:true, prefix: tableRightPrefix};

  constructor(private drs: DateRangeService,
              ) {
    this.dt = {str_begin: '', str_end: '', dt_begin: null, dt_end: null};
    // Событие изменения даты
    drs.CalendaryOnSelectDay$().subscribe(n =>{
//      console.log('Select Day=', n);
      // При заполненных обеих дат, скидываем и устанавливаем начальную
      if (this.dt.dt_begin && this.dt.dt_end) {
        this.dt.dt_begin = n;
        this.dt.dt_end = null;
      } else {
        if (this.dt.dt_begin == null) {
          this.dt.dt_begin = n;
        } else {
          if (this.dt.dt_begin > n) {
            this.dt.dt_begin = n;
            this.dt.dt_end = null;
          } else {
            this.dt.dt_end = n;
          }
        }
      }

      this.setHeaderBtn();
      if (this.dt.dt_begin && this.dt.dt_end){
        this.onChanged.emit({begin: this.dt.dt_begin , end: this.dt.dt_end});
        this.setAnime(false);
//        this.calendearyAnime = 'off';
      }

      drs.CalendarySetDateRange(this.dt);
// console.log('this.dt=', this.dt);
    });
  }

  ngOnInit(): void {
    moment.locale('ru');
    this.initDay();
  }

  initDay(){
    const minDt = new Date();
// console.error('111 this.dtBegin=', Object.assign({}, this.dtBegin));
//    this.drs.CalendarySetParams({prefix: tableLeftPrefix, curentDate: minDt, startDate: null, endDate: null});
    this.drs.CalendarySetParams({prefix: tableLeftPrefix, curentDate: minDt, startDate: this.dtBegin, endDate: this.dtEnd});
    var lastDay = new Date(minDt.getFullYear(), minDt.getMonth() + 1, 1);
//    this.drs.CalendarySetParams({prefix: tableRightPrefix, curentDate: lastDay, startDate: null, endDate: null});
    this.drs.CalendarySetParams({prefix: tableRightPrefix, curentDate: lastDay, startDate: this.dtBegin, endDate: this.dtEnd});
    this.setDateHeader(this.headerLeft, minDt, true, false);
    this.setDateHeader(this.headerRight, lastDay, false, true);
  }

  setAnime(f: boolean){
    this.isShown.update((value) => f);
/*
    if (this.isShown()){
      this.initDay();
    }
*/
  }

  // Установка текста на кнопке
  setHeaderBtn(){
    if (this.dt.dt_begin) {
      this.dt.str_begin = moment(new Date(this.dt.dt_begin)).format('D MMM YYYY');
    } else {
      this.dt.str_begin = '';
    }

    if (this.dt.dt_end) {
      this.dt.str_end = moment(new Date(this.dt.dt_end)).format('D MMM YYYY');
    } else {
      this.dt.str_end = '';
    }

  }

  /* только числа */
  public numberOnly(event: any): boolean {
    const charCode = event.keyCode;
    // Проверка на ввод числа
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  test(ev: any, isBegin: boolean){  //формат строки
    let str: string = '';
    let dt: Date | null = null;
    if (isBegin){
      str = (this.dt.str_begin)? this.dt.str_begin : '';
    } else {
      str = (this.dt.str_end)? this.dt.str_end : '';
    }
    if (str.length == 2 || str.length == 5){
      str = str + '.';
    }

    if (str.length == 10){ // Возможно уже Date
      try {
        dt = new Date(Number(str.substr(6,4))
          ,Number(str.substr(3,2))-1
          ,Number(str.substr(0,2))
          );
      }
      catch (e) {
        console.error('Err convert DT=', e)
      }
    }

    if (dt){ // Проверка на год (кол месяцев иногда изменяют год)
      if (moment(dt).format('DD.MM.YYYY') != str){
        dt = null;
      }
    }
// console.log('END DT=', dt);
    if (isBegin){
      this.dt.str_begin = str;
      this.dt.dt_begin = (dt)? dt : null;
      if (dt){
        // @ts-ignore
        document.getElementById('dr-end').focus();
      }
    } else {
      this.dt.str_end = str;
      this.dt.dt_end = (dt)? dt : null;
    }

  }

/*
  whenAnimateSearch(event: any) { // Окончание анимации
// console.log('EndAnim=', event);
        if (this.animState === 'off') {
          this.payAvansAnimeStatus = 1;
        } else {
          this.payAvansAnimeStatus = 0;
        }
  }
*/

  calendary(){
    this.setAnime(!this.isShown())
  }

  setDateHeader(h: IDateRangeHeader, dt: Date, l: boolean , r: boolean){
    h.dt = dt;
    h.mount = moment(h.dt).format('MMMM');
    h.year = h.dt.getFullYear();
    h.left = l;
    h.right = r;
  }

  mountPlusMinus(pr: IDateRangeHeader, znak: string){  // Добавить или уменьшить месяц
    switch (znak) {
      case '-': {
        if (pr.left) {
          let lastDay = new Date(pr.dt.getFullYear(), pr.dt.getMonth() - 1, 1); // Уменьшаем на 1 месяц
          this.setDateHeader(pr, lastDay, true, false);
          this.drs.CalendarySetParams({prefix: pr.prefix, curentDate: pr.dt, startDate: this.dt.dt_begin, endDate: this.dt.dt_end});
        }
        break;
      }
      case '+': {
        if (pr.right) {
          let lastDay = new Date(pr.dt.getFullYear(), pr.dt.getMonth() + 1, 1); // Увеличиваем на 1 месяц
          this.setDateHeader(pr, lastDay, true, true);
          this.drs.CalendarySetParams({prefix: pr.prefix, curentDate: pr.dt, startDate: this.dt.dt_begin, endDate: this.dt.dt_end});
        }
        break;
      }
//      this.cdr.detectChanges(); // Принудительно запускает детект изменений
/* TODO - не помогло*/
// Обновиьт форму111
    }

    // Общая проверка и блокировка
    // Проверка для левого
    let NextDay = new Date(this.headerLeft.dt.getFullYear(), this.headerLeft.dt.getMonth() + 1, 1); // + на 1 месяц
    if (this.headerRight.dt.getFullYear() == NextDay.getFullYear() &&
      this.headerRight.dt.getMonth() == NextDay.getMonth() ) {
      this.headerLeft.right = false;
      this.headerLeft.left = true;
    } else {
      this.headerLeft.right = true;
    }

    // Проверка для правого
    let PrevDay = new Date(this.headerRight.dt.getFullYear(), this.headerRight.dt.getMonth() - 1, 1); // + на 1 месяц
    if (this.headerLeft.dt.getFullYear() == PrevDay.getFullYear() &&
      this.headerLeft.dt.getMonth() == PrevDay.getMonth() ) {
//      this.setDateHeader(this.headerRight, this.headerRight.dt, false, true);
      this.headerRight.left = false;
      this.headerRight.right = true;
    } else {
      this.headerRight.left = true;
    }

  }


}
