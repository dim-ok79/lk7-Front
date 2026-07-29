import { Component, signal, ViewEncapsulation } from '@angular/core';
import { PanelTablePaginationComponent } from '../../common/panel-table-pagination/panel-table-pagination.component';
import { IPeriod } from '../../../interfaces/period.interface';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient.service';
import { IInetuserLog } from '../../../interfaces/patient.interface';
import { strToDate } from '../../../utils/global.function';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-logouts-list',
  imports: [CommonModule, PanelTablePaginationComponent, MatIconModule, NgbTooltipModule ],
  templateUrl: './logouts-list.component.html',
  styleUrl: './logouts-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class LogoutsListComponent {
  dtBegin: Date | null = null;    // Дата начала
  dtEnd: Date | null = null;    // Дата ококнчания
  periodText = '';

//  servicesListLength: number = 5;  // Количество записей

  patientLogs : IInetuserLog[] = [];  // Логи пациента
  patientLogsCountRectoPage = 10;     // Количетсво записей на странице
  patientLogsCountRec = signal(0);            // Всего записей


  constructor(private pService: PatientService,
              private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer

  ){
    this.iconRegistry.addSvgIcon('logInfo', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/account/logInfo.svg'));

    this.getLogSize();

/*
    this.pService.getInetuserLog$(1,20)
      .subscribe(
        info => {
          console.log('getInetuserLog$ info=', info);
        }, err => {
//                  this.patient = null;
          console.log('getInetuserLog$ err=', err);
        }
      );
*/

  }

  getLogSize(){
    this.pService.getInetuserLogSize$()
      .subscribe(
        res => {
          if (res.size) {
            this.patientLogsCountRec.update(val => val = res.size);
//            console.log('!!! this.patientLogsCountRec=', this.patientLogsCountRec);
            this.getPatientLog(1, this.patientLogsCountRectoPage);
          }
        }, err => {
          console.log('getInetuserLogSize$ err=', err);
        }
      );

  }

  public getPatientLog(pStart?: number , pEnd?: number): void {
//    this.loadingLogs = true;
    if (this.patientLogsCountRec() < 1) {
      this.getLogSize();
    } else {

      this.pService.getInetuserLog$(pStart, pEnd)
        .subscribe(
          res => {
            this.patientLogs = res;
            this.patientLogs.forEach(item => {
              item.date = strToDate(item.dat_str);
            });

//            this.loadingLogs = false;
          }, err => {
            this.patientLogs = [];
//            this.loadingLogs = false;
          }
        );

    }

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
  }

  /* Событие выбора страницы */
  changedPage(page: any) {
console.log('!!! page=', page);
    if (page == 1) {
      this.getPatientLog(1, this.patientLogsCountRectoPage);
    } else {
      this.getPatientLog(page*this.patientLogsCountRectoPage-this.patientLogsCountRectoPage , page*this.patientLogsCountRectoPage)
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
