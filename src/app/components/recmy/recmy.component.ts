import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
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
import { TalonComponent } from '../../modals/talon/talon.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtnComponent } from '../common/btn/btn.component';

@Component({
  selector: 'app-recmy',
  imports: [CommonModule, PanelTablePaginationComponent, MatIconModule, BtnComponent],
  templateUrl: './recmy.component.html',
  styleUrl: './recmy.component.scss',
})
export class RecmyComponent implements OnInit, AfterViewInit{
  @ViewChild('ContentBlockLog') ContentBlocklogEL: ElementRef|undefined;
  private modalService = inject(NgbModal);

  testHeightBlock = signal(100);

  typeMyRec   = signal<IBtnMyRec[]>([{id: 1, name: 'Предстоящие', active: false}, {id: 2, name: 'Завершенные', active: false}]);
  loading     = signal(false);            // Загрузка
  historyList = signal<IHistoryEvents[]>([]);
  rnumbList   = signal<IRnumbList[]>([]);


  dtBegin: Date | null = null;    // Дата начала
  dtEnd: Date | null = null;    // Дата ококнчания
  periodText = '';
  historyCountRectoPage = 10;     // Количетсво записей на странице
  historyCountRec = signal(0);            // Всего записей
  rnumbCountRec = signal(0);            // Всего записей

  constructor(
    private historyS: HistoryService,
    private rnumbS: RnumbService,
    private configS: ConfigService,
  ){
    this.dtBegin = new Date();
    this.dtEnd = new Date();
    this.dtBegin.setDate(this.dtBegin.getDate() - 30);
  }

  ngOnInit(): void {
    this.onClickType(1);
  }

  ngAfterViewInit() {
    this.calcTableH();
  };


  openTalon(rnumb: IRnumbList){
    console.log('open rnumb=', rnumb);
    const modalRef = this.modalService.open(TalonComponent);
    modalRef.componentInstance.rnumbID = rnumb.rnumb_id;
    modalRef.componentInstance.typeTalon = 0;

    modalRef.result.then(
      (result) => {
        // Действие при закрытии (close)
        console.log(`Закрыто с результатом: ${result}`);
      },
      (reason) => {
        // Действие при отмене/закрытии крестиком (dismiss)
        console.log(`Отклонено по причине: ${reason}`);
      }
    );
  }

  /* расчет высоты блока относительно */
  private calcTableH(){
    console.log('0 calcTableH this.ContentBlocklogEL=', this.ContentBlocklogEL?.nativeElement.offsetHeight );
    this.testHeightBlock.update(curr => curr = this.ContentBlocklogEL?.nativeElement.offsetHeight-252);
  }

  /* Выбор типа выборки */
  onClickType(id: number) {
    this.typeMyRec.update(list =>
      list.map(item =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      )
    );

    if (this.getCurrentTypeMyRec().id == 1){ // Предстоящие
      this.getRnumbList();
    } else { // Завершенные
      this.changePeriod({begin: this.dtBegin, end:this.dtEnd})
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

  getHistorySize(){
    this.historyCountRec.update(val => 0);
    this.historyS.getHistoryEventsSize(this.dtBegin, this.dtEnd)
      .subscribe(
        info => {
          console.log('RES=', info);
          this.historyCountRec.update(val => info.size);
        }, err => {
          console.log('ERR=', err);
        }
      );
  }

    /* Получить Завершенные */
  getHistory(pStart: number, pEnd: number){
    this.historyList.update(val=> val = []);
      // По умолчанию
      this.historyS.getHistoryEvents(pStart, pEnd, this.dtBegin, this.dtEnd)
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
    this.dtBegin = dt.begin;
    this.dtEnd = dt.end;
    this.getHistorySize();
    this.getHistory(1, this.historyCountRectoPage);
  }


  /* Событие выбора страницы */
  changedPage(page: any) {
    console.log('!!! page=', page);

    if (page == 1) {
      this.getHistory(1, this.historyCountRectoPage);
    } else {
      this.getHistory(page*this.historyCountRectoPage-this.historyCountRectoPage , page*this.historyCountRectoPage);
    }
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
