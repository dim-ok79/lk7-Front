import { Component, EventEmitter, inject, Input, Output, signal, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./table-day.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class TableDayComponent{
//  protected readonly console = console;

  @Input() prefix: string = '';     // Префикс для разделеиния событий

  @Output() onClickDate = new EventEmitter<string>(); // выбрана Дата формат YYYY-MM-DD
  dayArray = signal<ICalendarDateItem[]>([]);  // Массив дней
  _params: IDateRangeCalendarData = {curentDate: new Date(), startDate: null, endDate: null, prefix: ''}; // Данные для инициализации
  weekDayArray = [
    {start:0, end:7},
    {start:7, end:14},
    {start:14, end:21},
    {start:21, end:28},
    {start:28, end:35},
    {start:35, end:42},
  ];
  private drs = inject(DateRangeService);

  constructor() {
    // Инициализация календаря
    this.drs.CalendaryonInit$().subscribe(n =>{
      if (n.prefix == this.prefix) {
        this.iniTable(n);
      }
    });

    // Событие выбора даты
    this.drs.CalendaryOnSetDateRange$().subscribe(dt =>{
      this.setDateRange(dt);
    });

    // Событие наведения на дату
    this.drs.CalendaryOnHoverDay$().subscribe(n =>{
//      console.log('CalendaryOnHoverDay$=', n);
      this.setStartInserted(n);
    });


  };

  formatDateStr(dt: Date | null | undefined): string {
    if (dt) {
      return moment(dt).format('DD-MM-YYYY');
    } else {
      return '';
    }
  }

  iniTable(params: IDateRangeCalendarData){
    moment.locale('ru');
      this._params = params;
      this.genTableDay(params.curentDate);
  }

  /* генератор календаря */
  genTableDay(minDt: Date){
    let weekday1 = 0;
    this.dayArray.set([]);

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

    let countDayLast = 35-this.dayArray().length; // 5 недель (5*7)
    for (var i = 1 ; i <= countDayLast; i++) { // добавляем оставшиеся дни
      const d = moment(lastDay).add(i, 'days').toDate();
      this.addDay(false, d);
    }

    // Установка дат
    if (this._params && (this._params.startDate || this._params.endDate)){
// console.log('Установка дат');
      this.dayArray.update((current) => {
        return current.map((item) => {
          if (item.isCurrentMonth){
            return { ...item,
              isStartDAY: (this.formatDateStr(item.data) == this.formatDateStr(this._params?.startDate)),
              isEndDay : (this.formatDateStr(item.data) == this.formatDateStr(this._params?.endDate))
            };
          }
          // Остальные объекты возвращаем как есть
          return item;
        });
      });

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

    this.dayArray.update(current => [...current, {
      isCurrentMonth: courrentMonth
      , data: dt
      , day: dt.getDate()
      , isStartDAY: false
      , isEndDay: false
      , isStartInserted: startInserted
      , isCurrentDay: curent && courrentMonth
    }]);
  }

// Проверка на активность даты
  isActive(dt: Date): boolean {
    return false;
  }

  // Выбор даты
//  clickDate(dt: ICalendarDateItem){
  clickDate(dt: any){
//    console.log('clickDate dt=', dt);
    this.drs.CalendarySelectDay(dt.data);
  }

  setStartInserted(day: ICalendarDateItem) { // Установка промежутков при наведении HOVER
    // Проверка на текущий календарь
    if (moment(this._params.curentDate).format('MMYYYY') == moment(day.data).format('MMYYYY')) { // В текущем календаре
      if (day.isCurrentMonth && this._params && this._params.startDate) {
        this.dayArray.update((current) => {
          return current.map((item) => {
            if (this._params && this._params.startDate && this._params.endDate) { // Есть периуд
              if (item.data >= this._params.startDate && item.data <= this._params.endDate && item.isCurrentMonth) {
                return { ...item, isStartInserted: true };
              } else {
                return { ...item, isStartInserted: false };
              }
            } else { // Только начало
              // @ts-ignore
              if (item.data >= this._params.startDate && item.data <= day.data && item.isCurrentMonth) {
                return { ...item, isStartInserted: true };
              } else {
                return { ...item, isStartInserted: false };
              }
            }

          });
        });

      } else { // событие наведения с другова календаря (выделяем все в промежутке)
        // Если выбрана хоть одна дата
        if (this._params && this._params.startDate) {
          // Усли это левый -> tableLeftPrefix
          if (this._params.prefix == tableLeftPrefix) {
            this.dayArray.update((current) => {
              return current.map((item) => {
                let tmp_isStartInserted = (this._params.startDate && item.isCurrentMonth && item.data > this._params.startDate) ? true : false;
                if (item.isStartInserted && this._params.endDate) { // Проверка на дату окончания
                  // @ts-ignore
                  tmp_isStartInserted = (item.data > this._params.startDate) ? true : false;
                }
                return { ...item, isStartInserted: tmp_isStartInserted };
              })
            });

          } else {
            // иначе правый
            if (this._params && this._params.endDate) {
              this.dayArray.update((current) => {
                return current.map((item) => {
                  return {
                    ...item,
                    isStartInserted: (this._params.endDate && item.isCurrentMonth && item.data < this._params.endDate && item.data < this._params.endDate) ? true : false
                  };
                })
              });
            }
          }

        }


      }


    }
  };

/* Не дает КЛИК на дате
  public onHoverDay(day: ICalendarDateItem){ // on-mouseover Наведение мыши
    if (day.isCurrentMonth) {
      this.drs.CalendaryHoverDay(day);
    }
  }
*/

  setDateRange(params: IDateRange){  // Установка дат
    this._params.startDate = params.dt_begin;
    this._params.endDate = params.dt_end;
    if (params.dt_begin || params.dt_end) {
      this.dayArray.update((current) => {
        return current.map((item) => {
          let tmp_isStartInserted = false;
          // @ts-ignore
          if (item.data >= this._params.startDate && item.data <= this._params.endDate && item.isCurrentMonth) {
            tmp_isStartInserted = true;
          }

          return {
            ...item,
            isStartDAY : (this.formatDateStr(item.data) == this.formatDateStr(params.dt_begin) && item.isCurrentMonth),
            isEndDay : (this.formatDateStr(item.data) == this.formatDateStr(params.dt_end) && item.isCurrentMonth),
            isStartInserted : tmp_isStartInserted
          };
        })
      });
    }

  }

}
