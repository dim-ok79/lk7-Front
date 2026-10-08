import { Component, inject, input, Input, signal } from '@angular/core';
import { SemdService } from '../../../services/semd.service';
import { ISemd } from '../../../interfaces/semd.interface';
import { CommonModule } from '@angular/common';
import { PanelTablePaginationComponent } from '../../common/panel-table-pagination/panel-table-pagination.component';
import { MatIconModule} from '@angular/material/icon';
import { IPeriod } from '../../../interfaces/period.interface';
import { UtilsService } from '../../../services/application/utils.service';

// Заключения / Профосмотры
@Component({
  selector: 'app-my-doc-findings',
  imports: [CommonModule, PanelTablePaginationComponent, MatIconModule],
  templateUrl: './my-doc-findings.component.html',
  styleUrl: './my-doc-findings.component.scss',
})
export class MyDocFindingsComponent {
  _testHeightBlock = signal<number>(100);

  @Input()
  set testHeightBlock(value: number) {
    console.log('_testHeightBlock value=', value);
    this._testHeightBlock.set(value);
    console.log('_testHeightBlock=', this._testHeightBlock());
  }

  get testHeightBlock():number {
    return this._testHeightBlock();
  }

  _p_type = signal<number>(0);

  @Input()
  set p_type(value: number) {
    this._p_type.set(value);

    this.dtBegin = new Date();
    this.dtBegin.setDate(this.dtBegin.getDate()-365);
    this.dtEnd = new Date();
    this.getfindingSize();
    this.getfinding(1, this.findingCountRectoPage)

  }

  get p_type():number {
    return this._p_type();
  }

/*
  _p_type = signal<number>(0);
  @Input()
  set p_type(value: number) {
    this._p_type.set(value);
  }

  get p_type():number {
    return this._p_type();
  }
*/



  public UtilsS = inject(UtilsService);
  public SemdS = inject(SemdService);

  dtBegin: Date = new Date();    // Дата начала
  dtEnd: Date = new Date();    // Дата ококнчания
  findingCountRectoPage = 10;     // Количетсво записей на странице
  findingCountRec = signal(0);            // Всего записей
  findingList = signal<ISemd[]>([]);



  constructor() {
  }

  getfindingSize(){
    this.findingCountRec.update(val => 0);
    this.SemdS.getSemdPatientListSize(this.dtBegin, this.dtEnd, this.p_type)
      .subscribe(
        info => {
          this.findingCountRec.update(val => info.size);
        }, err => {
          console.log('ERR=', err);
        }
      );
  }

  /* Получить СЕМДы заключения */
  getfinding(pStart: number, pEnd: number){
    this.findingList.update(val=> val = []);
    // По умолчанию
    this.SemdS.getSemdPatientList(this.dtBegin, this.dtEnd, pStart, pEnd, this.p_type)
      .subscribe(
        info => {
          this.findingList.update((items) => info);
        }, err => {
          console.log('ERR=', err);
        }
      );
  }

  /* выбор даты */
  changePeriod(dt: IPeriod) {
    this.dtBegin = dt.begin ? dt.begin : new Date();
    this.dtEnd = dt.end ? dt.end : new Date();
    this.getfindingSize();
    this.getfinding(1, this.findingCountRectoPage);
  }

  /* Событие выбора страницы */
  changedPage(page: any) {
    if (page == 1) {
      this.getfinding(1, this.findingCountRectoPage);
    } else {
      this.getfinding(page*this.findingCountRectoPage-this.findingCountRectoPage , page*this.findingCountRectoPage);
    }
  }

}
