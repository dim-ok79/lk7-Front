import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  signal,
  viewChild,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { PanelTablePaginationComponent } from '../../common/panel-table-pagination/panel-table-pagination.component';
import { IPeriod } from '../../../interfaces/period.interface';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient.service';
import { IInetuserLog } from '../../../interfaces/patient.interface';
import { dateMinusDay, strToDate } from '../../../utils/global.function';
import { MatIconModule} from '@angular/material/icon';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-logouts-list',
  imports: [CommonModule, PanelTablePaginationComponent, MatIconModule, NgbTooltipModule ],
  templateUrl: './logouts-list.component.html',
  styleUrl: './logouts-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class LogoutsListComponent implements AfterViewInit {
//  @Input() HeightBlock = 0;      // указать высоту блока

  _HeightBlock: number = 0;
  @Input()      // Высота блока
  set HeightBlock(value: number) {
    console.log('1HeightBlock SET value=', value);
    if (value>10){
      this.testHeightBlock.update(val => val = value - 255 - 25);
    }
    this._HeightBlock = value;
  }

  get HeightBlock(): number {
    console.log('HeightBlock GET value=', this._HeightBlock);
    return this._HeightBlock;
  }

  testHeightBlock = signal(0);

//  @ViewChild('ContentBlockTbody') ContentBlockTbodyEL: ElementRef|undefined;
//  @ViewChild('ContentBlockTbody') ContentBlockTbodyEL!: ElementRef;
//  @ViewChild('ContentBlockTbody') ContentBlockTbodyEL!: ElementRef;

//   blockRef = viewChild<ElementRef>('ContentBlockTbody');

  dtBegin: Date | null = null;    // Дата начала
  dtEnd: Date | null = null;    // Дата ококнчания
  periodText = '';
  loading = signal(false);
//  servicesListLength: number = 5;  // Количество записей

  patientLogs : IInetuserLog[] = [];  // Логи пациента
  patientLogsCountRectoPage = 10;     // Количетсво записей на странице
  patientLogsCountRec = signal(0);            // Всего записей


  constructor(private pService: PatientService,
  ){

//    this.getLogSize();
    // Установка даты
    this.dtEnd = dateMinusDay(new Date(), 0);
    this.dtBegin = dateMinusDay(this.dtEnd, 20);
    this.getPatientLog(1, this.patientLogsCountRectoPage, this.dtBegin, this.dtEnd);

  }

  ngAfterViewInit() {
/*
    console.log('this.ContentBlockTbodyEL=', this.ContentBlockTbodyEL)
    console.log('this.HeightBlock=', this.HeightBlock)
*/

/*
    const el = this.blockRef()?.nativeElement;
console.log('EL=', el)
    if (el) {
      el.style.height = '500px'; // Устанавливаем нужную высоту
    }
*/

  }

  getLogSize(){
    this.pService.getInetuserLogSize$(this.dtBegin, this.dtEnd)
      .subscribe(
        res => {
          if (res.size) {
            this.patientLogsCountRec.update(val => val = res.size);
//            console.log('!!! this.patientLogsCountRec=', this.patientLogsCountRec);
//            this.getPatientLog(1, this.patientLogsCountRectoPage, this.dtBegin, this.dtEnd);
          }
        }, err => {
          console.log('getInetuserLogSize$ err=', err);
        }
      );

  }

  public getPatientLog(pStart?: number , pEnd?: number, pbeginDate?: Date | null, pendDate?: Date | null): void {
    this.loading.update(val => val = true);
/*
    if (this.patientLogsCountRec() < 1) {
      this.getLogSize();
    } else {
*/
      this.getLogSize();

      this.pService.getInetuserLog$(pStart, pEnd, pbeginDate, pendDate)
        .subscribe(
          res => {
            this.patientLogs = res;
            this.patientLogs.forEach(item => {
              item.date = strToDate(item.dat_str);
            });

            this.loading.update(val => val = false);
          }, err => {
            this.patientLogs = [];
            this.loading.update(val => val = false);
          }
        );

//    }

  }

  // Получение периода текстом
  setPeriodText(){
    let strBegin = '';
    let strEnd = '';
    if (this.dtBegin) {
      strBegin = moment(new Date(this.dtBegin)).format('D MMM YYYY');
    }
    if (this.dtEnd) {
      strEnd = moment(new Date(this.dtEnd)).format('D MMM YYYY');
    }

    if (strBegin && strEnd){
      this.periodText = `${strBegin} - ${strEnd}`;
    } else if(strBegin){
      this.periodText = strBegin
    } else if(strEnd){
      this.periodText = strEnd
    }else{
      this.periodText = 'Последние услуги'
    }
  }

  changePeriod(dt: IPeriod) {
    // console.log('changePeriod=', dt);
    this.dtBegin = dt.begin;
    this.dtEnd = dt.end;
//    this.getServicesSize();
console.log('LL changePeriod=', dt);
    this.setPeriodText();
    this.getPatientLog(1, this.patientLogsCountRectoPage, this.dtBegin, this.dtEnd);

  }

  /* Событие выбора страницы */
  changedPage(page: any) {
console.log('!!! page=', page);
    if (page == 1) {
      this.getPatientLog(1, this.patientLogsCountRectoPage, this.dtBegin, this.dtEnd);
    } else {
      this.getPatientLog(page*this.patientLogsCountRectoPage-this.patientLogsCountRectoPage , page*this.patientLogsCountRectoPage, this.dtBegin, this.dtEnd)
    }
  }


  /* Событие выбора страницы */
/*
  changedPage(page: number) {
    console.log('changedPage page=', page);

/!*
    if (page == 1) {
      this.getPatientLog(1, this.patientLogsCountRectoPage);
    } else {
      this.getPatientLog(page*this.patientLogsCountRectoPage-this.patientLogsCountRectoPage , page*this.patientLogsCountRectoPage)
    }
*!/
  }
*/

  public getDateTime(dt: Date): string {
    let tmp = '';
    moment.locale('ru');
    tmp = moment(dt).format('D MMM YYYY') + ' в ' + moment(dt).format('HH:mm');
    return tmp;
  }

}
