import { AfterViewInit, Component, ElementRef, Input, OnInit, signal, ViewChild } from '@angular/core';
import { IBtnMyRec } from '../../interfaces/recmy.interface';
import { CommonModule } from '@angular/common';
import { HistoryService } from '../../services/history.service';
import { IHistoryEvents } from '../../interfaces/history.interface';
import { IPeriod } from '../../interfaces/period.interface';
import { PanelTablePaginationComponent } from '../common/panel-table-pagination/panel-table-pagination.component';
import { MatIconModule} from '@angular/material/icon';
import {getTekDay, getNameDay, getTime} from "../../utils/global.function";
import { RnumbService } from '../../services/rnumb.service';
import { IRnumbList } from '../../interfaces/rnumb.interface';
import { ConfigService } from '../../services/application/config.service';

@Component({
  selector: 'app-recmy',
  imports: [CommonModule, PanelTablePaginationComponent, MatIconModule],
  templateUrl: './recmy.component.html',
  styleUrl: './recmy.component.scss',
})
export class RecmyComponent implements OnInit, AfterViewInit{
  @ViewChild('ContentBlockLog') ContentBlocklogEL: ElementRef|undefined;

  testHeightBlock = signal(100);

  typeMyRec = signal<IBtnMyRec[]>([{id: 1, name: 'Предстоящие', active: false}, {id: 2, name: 'Завершенные', active: false}]);
  loading = signal(false);            // Загрузка
  historyList =signal<IHistoryEvents[]>([]);
  rnumbList = signal<IRnumbList[]>([]);


  dtBegin: Date | null = null;    // Дата начала
  dtEnd: Date | null = null;    // Дата ококнчания
  periodText = '';
  patientLogsCountRectoPage = 10;     // Количетсво записей на странице
  historyCountRec = signal(0);            // Всего записей
  rnumbCountRec = signal(0);            // Всего записей

  constructor(
    private historyS: HistoryService,
    private rnumbS: RnumbService,
    private configS: ConfigService,
  ){
    this.dtBegin = new Date();
    this.dtEnd = new Date();
    this.dtBegin.setDate(this.dtBegin.getDate() - 60);
  }

  ngOnInit(): void {
    this.onClickType(1);
  }

  ngAfterViewInit() {
    this.calcTableH();
  };

  /* расчет высоты блока относительно */
  private calcTableH(){
    console.log('0 calcTableH this.ContentBlocklogEL=', this.ContentBlocklogEL?.nativeElement.offsetHeight );
    this.testHeightBlock.update(curr => curr = this.ContentBlocklogEL?.nativeElement.offsetHeight-252);
  }

  onClickType(id: number) {
    this.typeMyRec.update(list =>
      list.map(item =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      )
    );


    if (this.getCurrentTypeMyRec().id == 1){ // Предстоящие
      this.getRnumbList();
    } else { // Завершенные
      this.getHistory(this.dtBegin!, this.dtEnd!);
    }

  };


  /* Текущий тип */
  getCurrentTypeMyRec(): IBtnMyRec{
    return this.typeMyRec().filter(item => item.active)[0];
  }

  /* Получить предстоящие*/
  getRnumbList(){
    this.rnumbList.update(val=> val = []);

    this.rnumbS.getRnumbList()
      .subscribe(
        info => {
          this.rnumbList.update((items) => info);
          this.rnumbCountRec.update(val => val = info.length);
          console.log('RES=', info);
        }, err => {
          console.log('ERR=', err);
        }
      );

  }

  /* Получить Завершенные */
  getHistory(dtStart: Date, dtEnd: Date){
    this.historyList.update(val=> val = []);
    this.historyCountRec.update(val => 0);
      this.historyS.getHistoryEventsSize(dtStart, dtEnd)
        .subscribe(
          info => {
            console.log('RES=', info);
            this.historyCountRec.update(val => info.size);
          }, err => {
            console.log('ERR=', err);
          }
        );

      // По умолчанию
      this.historyS.getHistoryEvents(1, 20, dtStart, dtEnd)
        .subscribe(
          info => {
            this.historyList.update((items) => info);
            console.log('RES=', info);
          }, err => {
            console.log('ERR=', err);
          }
        );
  }

  /* выбор даты */
  changePeriod(dt: IPeriod) {
    console.log('changePeriod=', dt);
/*
    this.dtBegin = dt.begin;
    this.dtEnd = dt.end;
//    this.getServicesSize();
    console.log('LL changePeriod=', dt);
    this.setPeriodText();
    this.getPatientLog(1, this.patientLogsCountRectoPage, this.dtBegin, this.dtEnd);

*/
  }


  /* Событие выбора страницы */
  changedPage(page: any) {
    console.log('!!! page=', page);
/*
    if (page == 1) {
      this.getPatientLog(1, this.patientLogsCountRectoPage, this.dtBegin, this.dtEnd);
    } else {
      this.getPatientLog(page*this.patientLogsCountRectoPage-this.patientLogsCountRectoPage , page*this.patientLogsCountRectoPage, this.dtBegin, this.dtEnd)
    }
*/
  }


  gotToDownload(id: number, tp: string) {
    window.open(`${this.configS.getValue('hostBackend')}/history/events/item/${tp}/${id}.pdf`, '_blank');
  }

  getTekDay(dt: Date): string {
    return getTekDay(dt);
  }

  getNameDay(dt: Date): string {
    return getNameDay(dt);
  }

  getTime(dt: Date): string {
    return getTime(dt);
  }


}
