import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {IPeriod} from "../../../interfaces/period.interface";
import { PaginationComponent } from '../pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { DateRangeComponent } from '../date-range/date-range.component';

@Component({
  selector: 'app-panel-table-pagination',
  imports: [CommonModule, PaginationComponent, DateRangeComponent],
  templateUrl: './panel-table-pagination.component.html',
  styleUrls: ['./panel-table-pagination.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PanelTablePaginationComponent implements OnInit {
  @Input() CountRec = 0;     // Всего записей
  @Input() CountRecPage = 3;     // Кол записей на странице
  @Input() nameBlock = '';     // Наименование
  @Input() textItogo = '';     // Текст ИТОГО
  @Input() textNotREC: string | null = null;    // Текст Нет записей
  @Input() textItogoStrEnd = []; // окончания, если пустой массив то не применяем
  @Input() HeaderHide = false;    // Показывать заголовок с календарем ?

/*
  @Input() dtBegin = new Date();    // Дата начала
*/
  _dtBegin: Date | null = null;
  _dtEnd: Date | null = null;

  @Input()      // Дата начала
  set dtBegin(value: Date | null) {
//    console.log('DateB1112 SET value=', value);
    this._dtBegin = value;
  }

  get dtBegin(): Date | null{
    return this._dtBegin;
  }

  @Input()
  set dtEnd(value: Date | null) {
//    console.log('DateB22 SET value=', value);
    this._dtEnd = value;
  }

  get dtEnd(): Date | null{
    return this._dtEnd;
  }

  @Output() onChangePeriod = new EventEmitter<IPeriod>(); // Смена даты
  @Output() onChangedPage = new EventEmitter<Number>(); // Смена страници

  constructor() {
  }

  ngOnInit(): void {
//    console.log('111111');
//    this.CountRec = 36;
/*
    this.CountRecSet.emit(this.CountRec);
*/
  }

// Смена периода
  onChangedPeriod(dt: IPeriod): void {
/*
    if (typeof dt.begin === date) {

    }
*/

//    console.log('Edit DT begin1==', dt.begin);
//    console.log('Edit DT=', dt);
    this.onChangePeriod.emit(dt);
  }



  /* Событие выбора страницы */
  changedPage(page: number | any) {
    console.log('changedPage page=', page);
    this.onChangedPage.emit(page);
  }

}
