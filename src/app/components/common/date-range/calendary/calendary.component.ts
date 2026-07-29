import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICalendarDate, ICalendarHeader} from "../../../../interfaces/calendar";
import moment from 'moment';
import {DateRangeService} from "../../../../services/date-range.service";
import {IDateRangeCalendarData} from "../../../../interfaces/date-range.interface";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendary',
  imports: [CommonModule],
  templateUrl: './calendary.component.html',
  styleUrls: ['./calendary.component.scss']
})
export class CalendaryComponent implements OnInit {
  @Input() prefix: string = '';     // Префикс для разделеиния событий
  @Output() onClickDate = new EventEmitter<string>(); // выбрана Дата формат YYYY-MM-DD
  dayArray: ICalendarDate[] = [];  // Массив дней
  _params: IDateRangeCalendarData | null = null; // Данные для инициализации
  weekDayArray = [
    {start:0, end:7},
    {start:7, end:14},
    {start:14, end:21},
    {start:21, end:28},
    {start:28, end:35},
    {start:35, end:42},
  ];
  headerText: ICalendarHeader  = {mount: '', year: ''};

  constructor(private drs: DateRangeService) {
    drs.CalendaryonInit$().subscribe(n =>{
      if (n.prefix == this.prefix) {
        this.initCalendary(n);
      }
    });

  }

  ngOnInit(): void {
    this._params = null;
  }


//  creatHeader(minDt: Date, maxDt: Date){
  creatHeader(dt: Date){
    this.headerText.mount = `${moment(dt).format('MMMM')}`;
    this.headerText.year = `${dt.getFullYear()}`;
  }

  initCalendary(params: IDateRangeCalendarData){
    moment.locale('ru');
console.log('initCalendary params=', params);
    this._params = params;
//    Number(moment(dt).format('YYYYMMDD'))
    this.creatHeader(params.curentDate);
    this.genCalendaryDay(params.curentDate);
    // Автоматом выбор первого дня с талоном
/*
    let i = 0; let f = true;
    while ((i <= this.dayArray.length -1) && (f)){
      if (this.dayArray[i].isAction) {
        this.clicDate(this.dayArray[i]);
        f = false;
      }
      i++;
    }
*/
  }

  /* генератор календаря */
  genCalendaryDay(minDt: Date){
//    let firstDay = minDt;
    let weekday1 = 0;
    //
    this.dayArray = [];
//console.log('firstDay=', moment(firstDay).format('DD-MM-YYYY'));

    let firstDay1 = new Date(minDt.getFullYear(), minDt.getMonth(), 1);
    var lastDay = new Date(minDt.getFullYear(), minDt.getMonth() + 1, 0);

    weekday1 = moment(firstDay1).isoWeekday(); // День недели первого числа периода

// console.log('firstDay1=', moment(firstDay1).format('DD-MM-YYYY'));
// console.log('lastDay=', moment(lastDay).format('DD-MM-YYYY'));
// console.log('isoWeekday=', weekday1);
    let countDay = Number(moment(lastDay).format('DD'));
    if (weekday1>1) { // Если не понедельник, добавляем из предыдущего месяца
      // Добавляем даты предыдущего месяца
      for (var i = weekday1 - 1 ; i >= 1; i--) {
        this.addDay(false, moment(firstDay1).subtract(i, 'days').toDate(), false);
      }
    }

    // Добавляем месяц целиком
    for (var i = 0 ; i < countDay; i++) {
      const d = moment(firstDay1).add(i, 'days').toDate();
      this.addDay(true, d, this.isActive(d));
    }

    let countDayLast = 35-this.dayArray.length; // 5 недель (5*7)
    for (var i = 1 ; i <= countDayLast; i++) { // добавляем оставшиеся дни
      const d = moment(lastDay).add(i, 'days').toDate();
      this.addDay(false, d, this.isActive(d));
    }

////

//    this.dayArray = [];
/*
    weekday1 = moment(minDt).isoWeekday(); // День недели первого числа периода
    // Проверка если 1 число не понедельник
    if (weekday1>1) {
      // Добавляем даты предыдущего месяца
      for (var i = weekday1 - 1 ; i >= 1; i--) {
        this.addDay(false, moment(firstDay).subtract(i, 'days').toDate(), false);
      }
    }
    let countDay = 35-this.dayArray.length; // 5 недель (5*7)
    for (var i = 0 ; i < countDay; i++) { // добавляем оставшиеся дни
      const d = moment(firstDay).add(i, 'days').toDate();
      this.addDay(true, d, this.isActive(d));
    }
*/

//    console.log('dayArray=', this.dayArray);
  }

  addDay(courrentMonth: boolean, dt: Date, activ: boolean){
    const curent: boolean = (moment(dt).format('DD-MM-YYYY') == moment(new Date()).format('DD-MM-YYYY') );
    this.dayArray.push({
      isCourrentMonth: courrentMonth
      , data: dt
      , day: dt.getDate()
      , isAction: activ
      , isSelected: false
      , isCourrentDay: curent && courrentMonth
    });
  }

// Проверка на активность даты
  isActive(dt: Date): boolean {
/*
    let n = Number(moment(dt).format('YYYYMMDD'));
    if (this._params){
        return this._params.talonList.filter(item => item.dtFilter === n).length>0;
    } else {
      return false;
    }
*/
    return false;
  }

  clicDate(dt: ICalendarDate){
/*
    console.log('clic DT=', dt);
    this.dayArray.forEach(item => {
      item.isSelected = (item == dt && item.isAction);
    });
    if (dt.isAction) {
        this.drs.TalonsDaySetParams({dt: dt.data});
    }
*/
  }

}
