import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICalendarDateItem, IDateRange, IDateRangeCalendarData} from "../../../../interfaces/date-range.interface";
import {DateRangeService} from "../../../../services/date-range.service";
import moment from 'moment';
import { CommonModule } from '@angular/common';

const tableLeftPrefix = 'dtLeft';
const tableRightPrefix = 'dtRight';

@Component({
  selector: 'app-table-day',
  imports: [CommonModule],
  templateUrl: './table-day.component.html',
  styleUrls: ['./table-day.component.scss']
})

export class TableDayComponent implements OnInit {
  @Input() prefix: string = '';     // Префикс для разделеиния событий
/*
  @Input()      // Префикс для разделеиния событий
  set prefix(value: string) {
    this._params.prefix = value;
  }
*/

  @Output() onClickDate = new EventEmitter<string>(); // выбрана Дата формат YYYY-MM-DD
  dayArray: ICalendarDateItem[] = [];  // Массив дней
  _params: IDateRangeCalendarData = {curentDate: new Date(), startDate: null, endDate: null, prefix: ''}; // Данные для инициализации
  weekDayArray = [
    {start:0, end:7},
    {start:7, end:14},
    {start:14, end:21},
    {start:21, end:28},
    {start:28, end:35},
    {start:35, end:42},
  ];

  constructor(private drs: DateRangeService) {
    drs.CalendaryonInit$().subscribe(n =>{
      if (n.prefix == this.prefix) {
        this.iniTable(n);
      }
    });

    // Событие выбора даты
    drs.CalendaryOnSetDateRange$().subscribe(dt =>{
//      console.log('CalendaryOnSetDateRange$=', Object.assign({}, dt));
      this.setDateRange(dt);
    });

    // Событие наведения на дату
    drs.CalendaryOnHoverDay$().subscribe(n =>{
//      console.log('CalendaryOnHoverDay$=', n);
      this.setStartInserted(n);
    });


  }

  ngOnInit(): void {
  }

  formatDateStr(dt: Date | null | undefined): string {
    if (dt) {
      return moment(dt).format('DD-MM-YYYY');
    } else {
      return '';
    }
  }

  iniTable(params: IDateRangeCalendarData){
    moment.locale('ru');
//   console.log('iniTable params=', params);
//    if (params.prefix == this._params.prefix) {
//      this._params.curentDate = params.curentDate;
      this._params = params;
//      this._params.curentDate = params.curentDate;
      this.genTableDay(params.curentDate);
//    }
  }

  /* генератор календаря */
  genTableDay(minDt: Date){
    let weekday1 = 0;
    this.dayArray = [];

    let firstDay = new Date(minDt.getFullYear(), minDt.getMonth(), 1);
    var lastDay = new Date(minDt.getFullYear(), minDt.getMonth() + 1, 0); // следующий месяц

    weekday1 = moment(firstDay).isoWeekday(); // День недели первого числа месяца

    let countDay = Number(moment(lastDay).format('DD'));
    if (weekday1>1) { // Если не понедельник, добавляем из предыдущего месяца
      // Добавляем даты предыдущего месяца
      for (var i = weekday1 - 1 ; i >= 1; i--) {
        this.addDay(false, moment(firstDay).subtract(i, 'days').toDate());
      }
    }

    // Добавляем месяц целиком
    for (var i = 0 ; i < countDay; i++) {
      const d = moment(firstDay).add(i, 'days').toDate();
      this.addDay(true, d);
    }

    let countDayLast = 35-this.dayArray.length; // 5 недель (5*7)
    for (var i = 1 ; i <= countDayLast; i++) { // добавляем оставшиеся дни
      const d = moment(lastDay).add(i, 'days').toDate();
      this.addDay(false, d);
    }

    // Установка дат
    if (this._params && (this._params.startDate || this._params.endDate)){
// console.log('Установка дат');
      this.dayArray.forEach((item, index) => {
        if (item.isCurrentMonth){
          item.isStartDAY = (this.formatDateStr(item.data) == this.formatDateStr(this._params?.startDate));
          item.isEndDay = (this.formatDateStr(item.data) == this.formatDateStr(this._params?.endDate));
        }
      });

//      this.setStartInserted(this.dayArray[10]);
//      let tt = this.dayArray.filter(item => moment(item.data).format('DD-MM-YYYY') == moment(this._params.startDate).format('DD-MM-YYYY'));
//      tt[0].isStartDAY = true;
// console.log('TT=', tt);
    } else {
// console.log('БЕЗ Установки дат');
    }
//     console.log('dayArray=', this.dayArray);
  }

  addDay(courrentMonth: boolean, dt: Date){
     const curent: boolean = (moment(dt).format('DD-MM-YYYY') == moment(new Date()).format('DD-MM-YYYY') );
     let startInserted: boolean = false;
     if (this._params.startDate && this._params.endDate) {
         if (dt >= this._params.startDate && dt <= this._params.endDate) {
             startInserted = true;
         }
     }

    this.dayArray.push({
        isCurrentMonth: courrentMonth
      , data: dt
      , day: dt.getDate()
      , isStartDAY: false
      , isEndDay: false
      , isStartInserted: startInserted
      , isCurrentDay: curent && courrentMonth
    });
  }

// Проверка на активность даты
  isActive(dt: Date): boolean {
    return false;
  }

  // Выбор даты
  clickDate(dt: ICalendarDateItem){
    this.drs.CalendarySelectDay(dt.data);
  }

/*
  between(dt: Date): boolean { // Проверка даты в текущем календаре

    return
  }
*/
  setStartInserted(day: ICalendarDateItem){ // Установка промежутков при наведении HOVER
    // Проверка на текущий календарь
    if (moment(this._params.curentDate).format('MMYYYY') == moment(day.data).format('MMYYYY')) { // В текущем календаре
      if (day.isCurrentMonth && this._params && this._params.startDate){
        this.dayArray.forEach((item, index) => {
          if (this._params && this._params.startDate && this._params.endDate) { // Есть периуд
            if (item.data >= this._params.startDate && item.data <= this._params.endDate && item.isCurrentMonth) {
              item.isStartInserted = true;
            } else {
              item.isStartInserted = false;
            }
          } else { // Только начало
            // @ts-ignore
            if (item.data >= this._params.startDate && item.data <= day.data && item.isCurrentMonth) {
              item.isStartInserted = true;
            } else {
              item.isStartInserted = false;
            }
          }
        });

      }

    } else { // событие наведения с другова календаря (выделяем все в промежутке)
      // Если выбрана хоть одна дата
      if (this._params && this._params.startDate){
        // Усли это левый -> tableLeftPrefix
        if (this._params.prefix == tableLeftPrefix) {
          this.dayArray.forEach((item, index) => {
//            item.isStartInserted = (item.isCourrentMonth && item.data > this._params.startDate && item.data < this._params.endDate) ? true : false;
            // @ts-ignore
            item.isStartInserted = (item.isCurrentMonth && item.data > this._params.startDate) ? true : false;
            if (item.isStartInserted && this._params.endDate){ // Проверка на дату окончания
              // @ts-ignore
              item.isStartInserted = (item.data > this._params.startDate) ? true : false;
            }
          });
        } else {
        // иначе правый
          if (this._params && this._params.endDate){
            this.dayArray.forEach((item, index) => {
              // @ts-ignore
              item.isStartInserted = (item.isCurrentMonth && item.data < this._params.endDate && item.data < this._params.endDate) ? true : false;
            });
          }
        }

      }


    }


  }

  public onHoverDay(day: ICalendarDateItem){ // on-mouseover Наведение мыши
    if (day.isCurrentMonth) {
      this.drs.CalendaryHoverDay(day);
    }
  }

  setDateRange(params: IDateRange){  // Установка дат
    this._params.startDate = params.dt_begin;
    this._params.endDate = params.dt_end;
    if (params.dt_begin || params.dt_end) {
      this.dayArray.forEach((item, index) => {
        item.isStartDAY = (this.formatDateStr(item.data) == this.formatDateStr(params.dt_begin) && item.isCurrentMonth);
        item.isEndDay = (this.formatDateStr(item.data) == this.formatDateStr(params.dt_end) && item.isCurrentMonth);
        // Установка промежутков
        item.isStartInserted = false;
        if (params.dt_begin && params.dt_end) {
//          item.isStartInserted = false;
          // @ts-ignore
          if (item.data >= this._params.startDate && item.data <= this._params.endDate && item.isCurrentMonth) {
            item.isStartInserted = true;
          }
        }

      });
    }

/*
console.log('this._params.prefix=', this._params.prefix);
console.log('this.dayArray=', this.dayArray);
*/
  }

}
